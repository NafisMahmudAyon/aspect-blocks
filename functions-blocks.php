<?php
if (!defined('ABSPATH'))
  exit; // if direct access


function WPTW_tag_escape($tag)
{
  $tag = strtolower(preg_replace('/[^a-zA-Z0-9-_:]/', '', $tag));
  $allowed_tags = ['section', 'strong', 'template', 'fieldset', 'figcaption', 'figure', 'blockquote', 'article', 'address', 'code', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'a', 'button', 'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot', 'caption', 'br'];
  if (in_array($tag, $allowed_tags)) {
    return esc_html($tag); // Escape the output
  } else {
    return esc_html('div');
  }
}

function WPTW_clean_html($html)
{
  $cleanedHtml = preg_replace('/\s+/', ' ', $html);

  return $cleanedHtml;
}

function autoConcatenateClasses($attributes): string
{
  // Ensure the input is an array; otherwise, return an empty string
  if (!is_array($attributes)) {
    return '';
  }

  // Collect valid class names
  $classes = [];

  // Check for specific keys like "sm", "md", "desktop", "custom"
  $keys = ['sm', 'md', 'desktop', 'custom'];

  foreach ($keys as $key) {
    if (isset($attributes[$key]) && is_string($attributes[$key]) && !empty(trim($attributes[$key]))) {
      $classes[] = trim($attributes[$key]);
    }
  }

  // Return the concatenated string of class names
  return implode(' ', $classes);
}



function cn(...$args): string
{
  // Filter out any empty or falsy values
  $filteredArgs = array_filter($args, function ($value) {
    return !empty($value);
  });

  // Concatenate the remaining values with spaces
  return implode(' ', $filteredArgs);
}

add_filter('block_categories_all', 'tailwind_blocks_categories', 10, 2);

function tailwind_blocks_categories($categories, $context)
{
  if (!empty($categories)) {
    $inserted = array(
      array(
        'slug' => 'tailwind-blocks',
        'title' => __('Tailwind Blocks', 'tailwind-blocks'),
      ),
      // array(
      //   'slug' => 'post-grid-tools',
      //   'title' => __('Combo Blocks - Tools', 'post-grid'),
      // ),
      // array(
      //   'slug' => 'post-grid-woo',
      //   'title' => __('Combo Blocks - WooCommerce', 'post-grid'),
      // ),
      // array(
      //   'slug' => 'post-grid-archive',
      //   'title' => __('Combo Blocks - Archive', 'post-grid'),
      // ),
    );
    array_splice($categories, 3, 0, $inserted); // splice in at position 3
    return $categories;
    // return array_merge(
    //     $categories,
    //     array(
    //         array(
    //             'slug'  => 'post-grid',
    //             'title' => __('Post Grid Combo', 'post-grid'),
    //         ),
    //         // array(
    //         //     'slug'  => 'post-grid-woo',
    //         //     'title' => __('Post Grid Combo - WooCommerce', 'post-grid'),
    //         // ),
    //     ),
    // );
  } else {
    return $categories;
  }
}

function tailwind_blocks_icon_handle()
{
  // Register and enqueue the script
  wp_enqueue_script(
    'tailwind-blocks-icon-handle', // Unique handle for the script
    tailwind_blocks_plugin_url. '/assets/iconsHandle.js', // Script URL
    array(), // Dependencies (optional)
    '1.0.0', // Version (optional)
    true // Load in the footer (true) or header (false)
  );
}
// add_action('wp_enqueue_scripts', 'tailwind_blocks_icon_handle');