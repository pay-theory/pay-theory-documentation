import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'transparent',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '4px',
        padding: '4px 6px',
        cursor: 'pointer',
        fontSize: '12px',
        color: copied
          ? 'var(--ifm-color-success)'
          : 'var(--ifm-color-emphasis-600)',
        transition: 'all 0.2s ease',
        marginLeft: '8px',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      title="Copy to clipboard">
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          style={{ width: '14px', height: '14px', fill: 'currentColor' }}>
          <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          style={{ width: '14px', height: '14px', fill: 'currentColor' }}>
          <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
        </svg>
      )}
    </button>
  );
}

CopyButton.propTypes = {
  value: PropTypes.string.isRequired,
};
