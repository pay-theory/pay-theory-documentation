#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ANSI color codes for better readability
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

class VersionComparison {
  constructor() {
    this.baseDir = path.join(__dirname, '../../..');
    this.docsDir = path.join(this.baseDir, 'docs');
    this.labDir = path.join(this.baseDir, 'versioned_docs', 'version-lab');
    this.differences = {
      onlyInDocs: [],
      onlyInLab: [],
      contentDiffers: [],
      identical: [],
    };
    this.stats = {
      totalFilesScanned: 0,
      totalDocsFiles: 0,
      totalLabFiles: 0,
      filesOnlyInDocs: 0,
      filesOnlyInLab: 0,
      filesWithDifferences: 0,
      identicalFiles: 0,
    };
  }

  // Get all files recursively from a directory
  getAllFiles(dirPath, arrayOfFiles = [], baseDir = '') {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const relativePath = baseDir ? path.join(baseDir, file) : file;

      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles, relativePath);
      } else {
        // Only include markdown and mdx files
        if (
          file.endsWith('.md') ||
          file.endsWith('.mdx') ||
          file === '_category_.json'
        ) {
          arrayOfFiles.push(relativePath);
        }
      }
    });

    return arrayOfFiles;
  }

  // Calculate file hash for quick comparison
  getFileHash(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return crypto.createHash('md5').update(content).digest('hex');
    } catch {
      return null;
    }
  }

  // Get detailed differences between two files
  getFileDifferences(file1Path, file2Path) {
    try {
      const content1 = fs.readFileSync(file1Path, 'utf8');
      const content2 = fs.readFileSync(file2Path, 'utf8');

      const lines1 = content1.split('\n');
      const lines2 = content2.split('\n');

      const differences = {
        lineCountDiff: lines1.length - lines2.length,
        sizeDiff: content1.length - content2.length,
        firstDifferentLine: null,
        totalDifferentLines: 0,
        addedLines: 0,
        removedLines: 0,
        modifiedSections: [],
      };

      // Simple line-by-line comparison
      const maxLines = Math.max(lines1.length, lines2.length);
      let inDiffSection = false;
      let currentSection = null;

      for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';

        if (line1 !== line2) {
          differences.totalDifferentLines++;

          if (differences.firstDifferentLine === null) {
            differences.firstDifferentLine = i + 1;
          }

          if (!inDiffSection) {
            inDiffSection = true;
            currentSection = {
              startLine: i + 1,
              endLine: i + 1,
              preview: {
                docs: line1.substring(0, 100),
                lab: line2.substring(0, 100),
              },
            };
            differences.modifiedSections.push(currentSection);
          } else if (currentSection) {
            currentSection.endLine = i + 1;
          }

          if (i >= lines1.length) {
            differences.addedLines++;
          } else if (i >= lines2.length) {
            differences.removedLines++;
          }
        } else {
          inDiffSection = false;
          currentSection = null;
        }
      }

      // Limit sections to first 5 for readability
      differences.modifiedSections = differences.modifiedSections.slice(0, 5);

      return differences;
    } catch {
      return null;
    }
  }

  // Compare directories
  compareVersions() {
    console.log(
      `${colors.bright}${colors.cyan}🔍 Pay Theory Documentation Version Comparison${colors.reset}`,
    );
    console.log(
      `${colors.gray}═══════════════════════════════════════════════${colors.reset}\n`,
    );

    console.log(`${colors.blue}Comparing:${colors.reset}`);
    console.log(`  📁 Production: ${colors.green}docs/${colors.reset}`);
    console.log(
      `  📁 Lab/Preview: ${colors.yellow}versioned_docs/version-lab/${colors.reset}\n`,
    );

    // Get all files from both directories
    const docsFiles = this.getAllFiles(this.docsDir);
    const labFiles = this.getAllFiles(this.labDir);

    this.stats.totalDocsFiles = docsFiles.length;
    this.stats.totalLabFiles = labFiles.length;

    // Create sets for easier comparison
    const docsSet = new Set(docsFiles);
    const labSet = new Set(labFiles);

    // Find files only in docs
    docsFiles.forEach(file => {
      if (!labSet.has(file)) {
        this.differences.onlyInDocs.push(file);
        this.stats.filesOnlyInDocs++;
      }
    });

    // Find files only in lab and compare content for common files
    labFiles.forEach(file => {
      if (!docsSet.has(file)) {
        this.differences.onlyInLab.push(file);
        this.stats.filesOnlyInLab++;
      } else {
        // File exists in both, compare content
        const docsPath = path.join(this.docsDir, file);
        const labPath = path.join(this.labDir, file);

        const docsHash = this.getFileHash(docsPath);
        const labHash = this.getFileHash(labPath);

        if (docsHash && labHash) {
          if (docsHash !== labHash) {
            const differences = this.getFileDifferences(docsPath, labPath);
            this.differences.contentDiffers.push({
              file,
              differences,
            });
            this.stats.filesWithDifferences++;
          } else {
            this.differences.identical.push(file);
            this.stats.identicalFiles++;
          }
        }
      }
    });

    this.stats.totalFilesScanned =
      this.stats.totalDocsFiles + this.stats.totalLabFiles;
  }

  // Format file path for display
  formatFilePath(file) {
    const parts = file.split(path.sep);
    if (parts.length > 1) {
      const fileName = parts.pop();
      const dirPath = parts.join('/');
      return `${colors.gray}${dirPath}/${colors.reset}${fileName}`;
    }
    return file;
  }

  // Display results
  displayResults() {
    console.log(
      `${colors.bright}${colors.blue}📊 Summary Statistics${colors.reset}`,
    );
    console.log(`${colors.gray}────────────────────${colors.reset}`);
    console.log(
      `  Total files in production: ${colors.green}${this.stats.totalDocsFiles}${colors.reset}`,
    );
    console.log(
      `  Total files in lab: ${colors.yellow}${this.stats.totalLabFiles}${colors.reset}`,
    );
    console.log(
      `  Files only in production: ${colors.cyan}${this.stats.filesOnlyInDocs}${colors.reset}`,
    );
    console.log(
      `  Files only in lab: ${colors.magenta}${this.stats.filesOnlyInLab}${colors.reset}`,
    );
    console.log(
      `  Files with differences: ${colors.red}${this.stats.filesWithDifferences}${colors.reset}`,
    );
    console.log(
      `  Identical files: ${colors.green}${this.stats.identicalFiles}${colors.reset}\n`,
    );

    // Files only in production (docs)
    if (this.differences.onlyInDocs.length > 0) {
      console.log(
        `${colors.bright}${colors.cyan}📄 Files Only in Production (docs/)${colors.reset}`,
      );
      console.log(
        `${colors.gray}────────────────────────────────────${colors.reset}`,
      );
      this.differences.onlyInDocs.forEach(file => {
        console.log(
          `  ${colors.green}+ ${this.formatFilePath(file)}${colors.reset}`,
        );
      });
      console.log('');
    }

    // Files only in lab
    if (this.differences.onlyInLab.length > 0) {
      console.log(
        `${colors.bright}${colors.magenta}🧪 Files Only in Lab (version-lab/)${colors.reset}`,
      );
      console.log(
        `${colors.gray}────────────────────────────────────${colors.reset}`,
      );
      this.differences.onlyInLab.forEach(file => {
        console.log(
          `  ${colors.yellow}+ ${this.formatFilePath(file)}${colors.reset}`,
        );
      });
      console.log('');
    }

    // Files with content differences
    if (this.differences.contentDiffers.length > 0) {
      console.log(
        `${colors.bright}${colors.red}⚠️  Files with Content Differences${colors.reset}`,
      );
      console.log(
        `${colors.gray}───────────────────────────────────${colors.reset}`,
      );

      this.differences.contentDiffers.forEach(({ file, differences }) => {
        console.log(
          `\n  ${colors.bright}${this.formatFilePath(file)}${colors.reset}`,
        );

        if (differences) {
          console.log(
            `    ${colors.gray}Line count difference: ${colors.reset}${differences.lineCountDiff > 0 ? colors.green : colors.red}${differences.lineCountDiff > 0 ? '+' : ''}${differences.lineCountDiff} lines${colors.reset}`,
          );
          console.log(
            `    ${colors.gray}Size difference: ${colors.reset}${differences.sizeDiff > 0 ? colors.green : colors.red}${differences.sizeDiff > 0 ? '+' : ''}${differences.sizeDiff} characters${colors.reset}`,
          );
          console.log(
            `    ${colors.gray}Total different lines: ${colors.reset}${colors.yellow}${differences.totalDifferentLines}${colors.reset}`,
          );

          if (differences.firstDifferentLine) {
            console.log(
              `    ${colors.gray}First difference at line: ${colors.reset}${colors.cyan}${differences.firstDifferentLine}${colors.reset}`,
            );
          }

          if (differences.modifiedSections.length > 0) {
            console.log(`    ${colors.gray}Modified sections:${colors.reset}`);
            differences.modifiedSections.forEach((section, index) => {
              if (index < 3) {
                // Show only first 3 sections
                console.log(
                  `      ${colors.gray}• Lines ${section.startLine}-${section.endLine}${colors.reset}`,
                );
                if (section.preview.docs) {
                  console.log(
                    `        ${colors.green}[docs] ${section.preview.docs.substring(0, 60)}...${colors.reset}`,
                  );
                }
                if (section.preview.lab) {
                  console.log(
                    `        ${colors.yellow}[lab]  ${section.preview.lab.substring(0, 60)}...${colors.reset}`,
                  );
                }
              }
            });
            if (differences.modifiedSections.length > 3) {
              console.log(
                `      ${colors.gray}... and ${differences.modifiedSections.length - 3} more sections${colors.reset}`,
              );
            }
          }
        }
      });
      console.log('');
    }

    // Action recommendations
    console.log(
      `${colors.bright}${colors.blue}💡 Recommendations${colors.reset}`,
    );
    console.log(`${colors.gray}──────────────────${colors.reset}`);

    if (this.stats.filesOnlyInDocs > 0) {
      console.log(
        `  ${colors.cyan}• Review files only in production - these may need to be added to lab version${colors.reset}`,
      );
    }

    if (this.stats.filesOnlyInLab > 0) {
      console.log(
        `  ${colors.magenta}• Review files only in lab - decide if they should be promoted to production${colors.reset}`,
      );
    }

    if (this.stats.filesWithDifferences > 0) {
      console.log(
        `  ${colors.red}• Review content differences - ensure intentional changes are preserved${colors.reset}`,
      );
      console.log(
        `  ${colors.gray}  Use 'diff' or your preferred merge tool for detailed comparison${colors.reset}`,
      );
    }

    if (
      this.stats.filesWithDifferences === 0 &&
      this.stats.filesOnlyInDocs === 0 &&
      this.stats.filesOnlyInLab === 0
    ) {
      console.log(
        `  ${colors.green}✅ All files are synchronized between versions!${colors.reset}`,
      );
    }

    console.log(
      `\n${colors.gray}═══════════════════════════════════════════════${colors.reset}`,
    );
    console.log(`${colors.bright}Comparison complete!${colors.reset}\n`);
  }

  // Main execution
  run() {
    try {
      this.compareVersions();
      this.displayResults();
    } catch (error) {
      console.error(
        `${colors.red}Error during comparison: ${error.message}${colors.reset}`,
      );
      process.exit(1);
    }
  }
}

// Run the comparison
const comparison = new VersionComparison();
comparison.run();
