<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

function aspectBlocks_tag_escape($tag)
{
  $tag = strtolower(preg_replace('/[^a-zA-Z0-9-_:]/', '', $tag));
  $allowed_tags = ['section', 'strong', 'template', 'fieldset', 'figcaption', 'figure', 'blockquote', 'article', 'address', 'code', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'a', 'button', 'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot', 'caption', 'br'];
  if (in_array($tag, $allowed_tags)) {
    return esc_html($tag); // Escape the output
  } else {
    return esc_html('div');
  }
}

function aspectBlocks_clean_html($html)
{
  $cleanedHtml = preg_replace('/\s+/', ' ', $html);

  return $cleanedHtml;
}

function aspectBlocks_auto_concatenate_classes($attributes): string
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

add_filter('block_categories_all', 'aspectBlocks_categories', 10, 2);

function aspectBlocks_categories($categories, $context)
{
  if (!empty($categories)) {
    $inserted = array(
      array(
        'slug' => 'aspect-blocks',
        'title' => __('Aspect Blocks', 'aspect-blocks'),
      ),
      // array(
      //   'slug' => 'aspect-blocks-tools',
      //   'title' => __('Aspect Blocks - Tools', 'aspect-blocks'),
      // ),
      // array(
      //   'slug' => 'aspect-blocks-woo',
      //   'title' => __('Aspect Blocks - WooCommerce', 'aspect-blocks'),
      // ),
      // array(
      //   'slug' => 'aspect-blocks-archive',
      //   'title' => __('Aspect Blocks - Archive', 'aspect-blocks'),
      // ),
    );
    array_splice($categories, 3, 0, $inserted); // splice in at position 3
    return $categories;
  } else {
    return $categories;
  }
}


// add_action('rest_api_init', function () {
//   var_dump('Registering REST Route');
//   register_rest_route('aspect-blocks/v2', '/meta', array(
//     'methods' => 'GET',
//     'callback' => function ($request) {
//       $post_id = $request['post_id'];
//       $meta_key = $request['meta_key'];

//       if (! $post_id || ! $meta_key) {
//         return new WP_Error('invalid_request', 'Invalid request parameters.', array('status' => 400));
//       }

//       $meta_value = get_post_meta($post_id, $meta_key, true);
//       return array('meta_value' => $meta_value);
//     },
//     'permission_callback' => '__return_true',
//     'args' => array(
//       'post_id' => array('required' => true, 'type' => 'integer'),
//       'meta_key' => array('required' => true, 'type' => 'string'),
//     ),
//   ));
// });