<?php
if (!defined('ABSPATH'))
  exit; // if direct access


function WPTW_tag_escape($tag)
{
  $tag = strtolower(preg_replace('/[^a-zA-Z0-9-_:]/', '', $tag));
  $allowed_tags = ['section', 'strong', 'template', 'fieldset', 'figcaption', 'figure', 'blockquote', 'article', 'address', 'code', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'a', 'button', 'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot', 'caption', 'br'];
  if (in_array($tag, $allowed_tags)) {
    return $tag;
  } else {
    return 'div';
  }
}

function WPTW_clean_html($html)
{
  $cleanedHtml = preg_replace('/\s+/', ' ', $html);

  return $cleanedHtml;
}