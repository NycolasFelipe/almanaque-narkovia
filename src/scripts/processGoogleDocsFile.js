/**
 * Adds a tag to the text content of elements with a specific class.
 *
 * @param {Element} rootElement - The root element containing the target elements.
 * @param {string} className - The class name of the target elements.
 * @param {string} tag - The tag to be added to the text content.
 *
 * @returns {Element} The modified root element.
 */
function setTag(rootElement, className, tag) {
  const items = rootElement.getElementsByClassName(className);

  for (let i = 0; i < items.length; i++) {
    items[i].textContent = `${tag}${items[i].textContent}${tag}`;
  }

  return rootElement;
}


/**
 * Replaces Google Docs-specific HTML elements and styles with custom tags.
 * 
 * @param {string} googleDocsHtml The HTML content from Google Docs.
 * @returns {string} The processed plain text with custom tags.
 */
function replaceGoogleDocsHtml(googleDocsHtml) {
  // Create a temporary DOM element to parse the HTML
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = googleDocsHtml;

  // Extract the main content
  let contentElement = tempContainer.querySelector('.doc-content');

  // Replace image URLs with custom tags
  const imageUrls = contentElement.innerHTML.split('#img');
  for (let i = 1; i < imageUrls.length; i++) {
    const urlMatch = imageUrls[i].match(/src="([^"]+)"/);
    if (urlMatch) {
      const imageUrl = urlMatch[1];
      imageUrls[i] = `#img(${imageUrl})` + imageUrls[i];
    }
  }
  contentElement.innerHTML = imageUrls.join('');

  // Replace image view URLs with custom tags
  const viewUrls = contentElement.innerHTML.split('#view');
  for (let i = 1; i < viewUrls.length; i++) {
    const urlMatch = viewUrls[i].match(/src="([^"]+)"/);
    if (urlMatch) {
      const viewUrl = urlMatch[1];
      viewUrls[i] = `#view(${viewUrl})` + viewUrls[i];
    }
  }
  contentElement.innerHTML = viewUrls.join('');

  // Extract style information
  const styleElement = document.createElement('div');
  styleElement.innerHTML = googleDocsHtml;

  const styles = styleElement.getElementsByTagName('style')[1];
  const stylesProperties = { 'bold': null, 'italic': null, 'underline': null };

  for (let i = 0; i < 7; i++) {
    const styleRule = styles.innerHTML.split(`.c${i}`)[1]?.split('}')[0];
    if (styleRule) {
      if (styleRule.includes('font-weight:700')) {
        stylesProperties.bold = `c${i}`;
      }
      else if (styleRule.includes('italic')) {
        stylesProperties.italic = `c${i}`;
      }
      else if (styleRule.includes('underline')) {
        stylesProperties.underline = `c${i}`;
      }
    }
  }

  // Apply text styling tags
  contentElement = setTag(contentElement, stylesProperties.bold, '#b');
  contentElement = setTag(contentElement, stylesProperties.italic, '#i');
  contentElement = setTag(contentElement, stylesProperties.underline, '#u');

  // Handle tables
  const tables = contentElement.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    contentElement.getElementsByTagName('table')[i].insertAdjacentHTML('afterend', '<div class="table"></div>');
    contentElement.getElementsByClassName('table')[i].append(contentElement.getElementsByTagName('table')[i].outerHTML);
  }

  for (let i = 0; i < tables.length; i++) {
    contentElement.getElementsByTagName('table')[i].textContent = '';
  }

  // Remove unnecessary HTML elements and normalize whitespace
  const plainText = contentElement.textContent || contentElement.innerText || '';
  const cleanedText = plainText.replaceAll('\t', '');

  styleElement.remove();
  return cleanedText;
}


/**
 * Replaces double characters with HTML tags.
 *
 * @param {string} text The input text.
 * @param {string} doubleChar The double character to replace.
 * @param {string} newTag The HTML tag to replace with.
 * @returns {string} The text with replaced tags.
 */
function replaceDoubleTag(text, char, newChar) {
  text = text.split(char);
  for (let i = 0; i < text.length - 1; i++) {
    if (i % 2 === 0) {
      switch (newChar) {
        case 'u':
          text[i] += '<span className="paragraph-underline">';
          break;

        case 'h2':
          text[i] += '<h2 className="paragraph-title">';
          break;

        case 'h3':
          text[i] += '<h3 className="paragraph-subtitle">';
          break;

        case 'p':
          text[i] += '<div className="paragraph">';
          break;

        case 'pe':
          text[i] += '<div className="paragraph paragraph-left">';
          break;

        case 't':
          text[i] += '<p className="paragraph-text">';
          break;

        case 'fill':
          text[i] += '<div className="paragraph-text-fill">';
          break;

        case 'debug':
          text[i] += '<div className="wrapper-debug">';
          break;

        default:
          text[i] += `<${newChar}>`;
          break;
      }
    }
    else {
      switch (newChar) {
        case 'u':
          text[i] += '</span>';
          break;

        case 't':
          text[i] += '</p>';
          break;

        case 'p': case 'pe': case 'fill': case 'debug':
          text[i] += '</div>';
          break;

        default:
          text[i] += `</${newChar}>`;
          break;
      }
    }
  }
  text = text.join('');
  return text;
}


/**
 * Replaces `#img(url)` with an HTML image element.
 *
 * @param {string} text The input text with image URLs.
 * @returns {string} The text with replaced image elements.
 */
function setImageTag(text) {
  const imageUrls = text.split('#img(');
  let result = imageUrls[0];

  for (let i = 1; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i].split(')')[0];
    result += `<div class="picture"><img src="${imageUrl}" class="picture-img"/></div>`;
    result += imageUrls[i].slice(imageUrl.length + 1);
  }

  return result;
}


/**
 * Replaces `#view(url)` with an HTML `photoview` element.
 *
 * @param {string} text The input text with view URLs.
 * @returns {string} The text with replaced `photoview` elements.
 */
function setImageViewTag(text) {
  const viewUrls = text.split('#view(');
  let result = viewUrls[0];

  for (let i = 1; i < viewUrls.length; i++) {
    const viewUrl = viewUrls[i].split(')')[0];
    result += `<photoview class="photoview-item" hidden is="x3d" key="${viewUrl}">${viewUrl}</photoview>`;
    result += viewUrls[i].slice(viewUrl.length + 1);
  }

  return result;
}


/**
 * Adds IDs to H2 and H3 elements based on their text content.
 *
 * @param {string} html The HTML content to process.
 * @returns {string} The modified HTML content with IDs.
 */
function setId(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const h2Elements = tempDiv.getElementsByTagName('h2');
  for (const h2 of h2Elements) {
    const title = h2.textContent.split(';')[0].trim().toLowerCase().normalize('NFKD').replace(/[^\w\s.-_\/]/g, '').replaceAll(' ', '-');
    h2.id = title;
  }

  const h3Elements = tempDiv.getElementsByTagName('h3');
  for (const h3 of h3Elements) {
    const title = h3.textContent.split(';')[0].trim().toLowerCase().normalize('NFKD').replace(/[^\w\s.-_\/]/g, '').replaceAll(' ', '-');
    h3.id = title;
  }

  const modifiedHtml = tempDiv.outerHTML;
  tempDiv.remove();
  return modifiedHtml;
}


/**
 * Creates a summary of H2 and H3 headings with links.
 *
 * @param {string} html The HTML content to process.
 * @returns {string} The generated summary HTML.
 */
function extractSummary(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const h2Elements = tempDiv.getElementsByTagName('h2');

  let summaryItems = '';

  for (const h2 of h2Elements) {
    const title = h2.innerText.toUpperCase().trim();
    const id = h2.id;
    summaryItems += `<a href="#${id}">${title}</a>`;
  }

  tempDiv.remove();
  return summaryItems;
}


/**
 * Extracts `photoview` elements from the given HTML.
 *
 * @param {string} html The HTML content to process.
 * @returns {string[]} An array of `photoview` elements.
 */
function extractPhotoviewElements(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const photoviewElements = tempDiv.firstChild.getElementsByTagName('photoview');
  const photoviewItems = [];

  for (const photoview of photoviewElements) {
    photoviewItems.push(photoview.innerHTML);
  }

  tempDiv.remove();
  return photoviewItems;
}


/**
 * Processes the given text by applying various transformations.
 *
 * @param {string} text The input text.
 * @returns {string} The processed text.
 */
function processText(text) {
  // Remove Google Docs specific HTML
  let processedText = replaceGoogleDocsHtml(text);

  // Replace special tags with HTML elements
  processedText = setImageTag(processedText);
  processedText = setImageViewTag(processedText);
  processedText = replaceDoubleTag(processedText, '#titulo', 'h2');
  processedText = replaceDoubleTag(processedText, '#subtitulo', 'h3');
  processedText = replaceDoubleTag(processedText, '#pe', 'pe');
  processedText = replaceDoubleTag(processedText, '#p', 'p');
  processedText = replaceDoubleTag(processedText, '#t', 't');
  processedText = replaceDoubleTag(processedText, '#fill', 'fill');
  processedText = replaceDoubleTag(processedText, '#b', 'b');
  processedText = replaceDoubleTag(processedText, '#u', 'u');
  processedText = replaceDoubleTag(processedText, '#i', 'i');
  processedText = replaceDoubleTag(processedText, '#debug', 'debug');

  // Add IDs to headings
  processedText = setId(processedText);
  return processedText;
}


/**
 * Reads a text file and processes its content.
 *
 * @param {string} filePath The path to the text file.
 * @returns {Promise<{data: string, summary: string, photoview: string[]}>} A promise that resolves to an object containing the processed data, summary, and photoview elements.
 */
async function processGoogleDocsFile(filePath) {
  const response = await fetch(filePath)
    .then(response => response.text())
    .then(text => {
      // Process the text
      const processedText = processText(text);

      // Extract summary and photoview elements
      const summary = extractSummary(processedText);
      const photoviewItems = extractPhotoviewElements(processedText);

      return {
        data: processedText,
        summary,
        photoviewItems,
      };
    });

  return response;
}

export default processGoogleDocsFile;