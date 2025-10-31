#!/bin/bash

# Define output file
OUTPUT_MD="Result-Pattern-Audit.md"

# Get current date, repo path, and branch name
TODAY_UTC_ISO=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
REPO_ROOT=$(pwd)
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Initialize associative arrays to store data
declare -A file_issues
declare -A file_occurrences
declare -A tsc_errors
declare -A error_message_passed
declare -A legacy_success_guard

# --- Data Processing ---

# Process TSC diagnostics
while IFS= read -r line; do
  if [[ "$line" =~ (src/.*\.ts)\(([0-9]+),([0-9]+)\):(.*) ]]; then
    filepath="${BASH_REMATCH[1]}"
    line_num="${BASH_REMATCH[2]}"
    message="${BASH_REMATCH[4]}"
    if [[ "$message" =~ Result|Ok|Err|success|ok|error|value ]]; then
        tsc_errors["$filepath:$line_num"]="$message"
        file_issues["$filepath"]="${file_issues[$filepath]} tsc-error"
        ((file_occurrences["$filepath"]++))
    fi
  fi
done < .tsc-diagnostics.txt

# Process error-message-passed
while IFS= read -r line; do
    filepath=$(echo "$line" | cut -d: -f1)
    line_num=$(echo "$line" | cut -d: -f2)
    snippet=$(echo "$line" | cut -d: -f3-)
    error_message_passed["$filepath:$line_num"]="$snippet"
    file_issues["$filepath"]="${file_issues[$filepath]} error-message-passed"
    ((file_occurrences["$filepath"]++))
done < .rg-error-message-passed.txt

# Process legacy-success-guard
while IFS= read -r line; do
    filepath=$(echo "$line" | cut -d: -f1)
    line_num=$(echo "$line" | cut -d: -f2)
    snippet=$(echo "$line" | cut -d: -f3-)
    legacy_success_guard["$filepath:$line_num"]="$snippet"
    file_issues["$filepath"]="${file_issues[$filepath]} legacy-success-guard"
    ((file_occurrences["$filepath"]++))
done < .rg-legacy-success-guard.txt


# --- Report Generation ---

# Start with a clean file
> "$OUTPUT_MD"

# Write header
cat <<EOF >> "$OUTPUT_MD"
# Result Pattern Audit

**Date:** $TODAY_UTC_ISO
**Repo:** $REPO_ROOT
**Branch:** $BRANCH_NAME

EOF

# Calculate summary
TOTAL_FILES=0
TOTAL_OCCURRENCES=0
TSC_ERROR_COUNT=0
ERROR_MESSAGE_PASSED_COUNT=0
LEGACY_SUCCESS_GUARD_COUNT=0

for file in "${!file_issues[@]}"; do
    ((TOTAL_FILES++))
    TOTAL_OCCURRENCES=$((TOTAL_OCCURRENCES + file_occurrences[$file]))
done

TSC_ERROR_COUNT=${#tsc_errors[@]}
ERROR_MESSAGE_PASSED_COUNT=${#error_message_passed[@]}
LEGACY_SUCCESS_GUARD_COUNT=${#legacy_success_guard[@]}

# Write summary
cat <<EOF >> "$OUTPUT_MD"
## Summary
- Total files with issues: **$TOTAL_FILES**
- Total occurrences: **$TOTAL_OCCURRENCES**

### Breakdown by category
- \`tsc-error\`: $TSC_ERROR_COUNT
- \`error-message-passed\`: $ERROR_MESSAGE_PASSED_COUNT
- \`nested-result\`: 0
- \`legacy-success-guard\`: $LEGACY_SUCCESS_GUARD_COUNT
- \`error-non-null\`: 0

EOF

# Write table of affected files
cat <<EOF >> "$OUTPUT_MD"
## Table of affected files
| # | File | Categories | Occurrences | Suggested Fix (one-liner) |
|---|------|------------|-------------|----------------------------|
EOF

i=1
sorted_files=$(for file in "${!file_issues[@]}"; do echo "$file"; done | sort)
for file in $sorted_files; do
    categories=$(echo "${file_issues[$file]}" | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/,$//' | sed 's/,/, /g')
    occurrences=${file_occurrences[$file]}
    suggested_fix="Fix Result pattern issues" # Generic suggestion
    echo "| $i | \`$file\` | $categories | $occurrences | $suggested_fix |" >> "$OUTPUT_MD"
    ((i++))
done

# Write detailed findings
echo "" >> "$OUTPUT_MD"
echo "## Detailed Findings" >> "$OUTPUT_MD"

for file in $sorted_files; do
    echo "" >> "$OUTPUT_MD"
    echo "### \`$file\`" >> "$OUTPUT_MD"
    categories=$(echo "${file_issues[$file]}" | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/,$//' | sed 's/,/, /g')
    echo "**Categories:** $categories" >> "$OUTPUT_MD"
    echo "**Occurrences:** ${file_occurrences[$file]}" >> "$OUTPUT_MD"
    echo "" >> "$OUTPUT_MD"

    # TSC Errors
    count=1
    for key in "${!tsc_errors[@]}"; do
        if [[ "$key" == "$file"* ]]; then
            line_num=$(echo "$key" | cut -d: -f2)
            message=${tsc_errors[$key]}
            echo "#### $count) \`tsc-error\`" >> "$OUTPUT_MD"
            echo "- **Line:** $line_num" >> "$OUTPUT_MD"
            echo "- **Snippet:**" >> "$OUTPUT_MD"
            echo "\`\`\`ts" >> "$OUTPUT_MD"
            echo "$message" >> "$OUTPUT_MD"
            echo "\`\`\`" >> "$OUTPUT_MD"
            ((count++))
        fi
    done

    # Error Message Passed
    for key in "${!error_message_passed[@]}"; do
        if [[ "$key" == "$file"* ]]; then
            line_num=$(echo "$key" | cut -d: -f2)
            snippet=${error_message_passed[$key]}
            echo "#### $count) \`error-message-passed\`" >> "$OUTPUT_MD"
            echo "- **Line:** $line_num" >> "$OUTPUT_MD"
            echo "- **Snippet:**" >> "$OUTPUT_MD"
            echo "\`\`\`ts" >> "$OUTPUT_MD"
            echo "$snippet" >> "$OUTPUT_MD"
            echo "\`\`\`" >> "$OUTPUT_MD"
            ((count++))
        fi
    done

    # Legacy Success Guard
    for key in "${!legacy_success_guard[@]}"; do
        if [[ "$key" == "$file"* ]]; then
            line_num=$(echo "$key" | cut -d: -f2)
            snippet=${legacy_success_guard[$key]}
            echo "#### $count) \`legacy-success-guard\`" >> "$OUTPUT_MD"
            echo "- **Line:** $line_num" >> "$OUTPUT_MD"
            echo "- **Snippet:**" >> "$OUTPUT_MD"
            echo "\`\`\`ts" >> "$OUTPUT_MD"
            echo "$snippet" >> "$OUTPUT_MD"
            echo "\`\`\`" >> "$OUTPUT_MD"
            ((count++))
        fi
    done
done

echo "Report generated at $OUTPUT_MD"
