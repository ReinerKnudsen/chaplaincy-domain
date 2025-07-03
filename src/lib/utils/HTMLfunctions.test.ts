import { describe, it, expect } from 'vitest';
import { decodeHtml } from './HTMLfunctions';

describe('decodeHtml', () => {
	it('should replace &lt; with <', () => {
		// Arrange: Set up the input
		const input = '&lt;div&gt;';
		
		// Act: Call the function
		const result = decodeHtml(input);
		
		// Assert: Check if the result is what we expected
		expect(result).toBe('<div>');
	});

	it('should replace &gt; with >', () => {
		const input = '&lt;div&gt;';
		const result = decodeHtml(input);
		expect(result).toBe('<div>');
	});

	it('should replace &quot; with single quote', () => {
		const input = 'He said &quot;Hello&quot;';
		const result = decodeHtml(input);
		expect(result).toBe('He said \'Hello\'');
	});

	it('should replace &#39; with single quote', () => {
		const input = 'It&#39;s working';
		const result = decodeHtml(input);
		expect(result).toBe('It\'s working');
	});

	it('should replace &amp; with &', () => {
		const input = 'Tom &amp; Jerry';
		const result = decodeHtml(input);
		expect(result).toBe('Tom & Jerry');
	});

	it('should replace <br> with newline', () => {
		const input = 'Line 1<br>Line 2';
		const result = decodeHtml(input);
		expect(result).toBe('Line 1\nLine 2');
	});

	it('should handle multiple replacements in one string', () => {
		const input = '&lt;p&gt;Hello &amp; welcome!&lt;br&gt;How are you?&lt;/p&gt;';
		const result = decodeHtml(input);
		expect(result).toBe('<p>Hello & welcome!\nHow are you?</p>');
	});

	it('should return unchanged string if no HTML entities', () => {
		const input = 'Just a normal string';
		const result = decodeHtml(input);
		expect(result).toBe('Just a normal string');
	});

	it('should handle empty string', () => {
		const input = '';
		const result = decodeHtml(input);
		expect(result).toBe('');
	});
});
