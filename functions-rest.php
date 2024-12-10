<?php
if (!defined('ABSPATH'))
  exit();


add_action('rest_api_init', function () {// Add this to debug
  register_rest_route('aspect-blocks/v2', '/meta', [
    'methods' => 'GET',
    'callback' => function ($request) {
      $post_id = $request['post_id'];
      $meta_key = $request['meta_key'];

      if (!$post_id || !$meta_key) {
        return new WP_Error('invalid_request', 'Invalid request parameters.', ['status' => 400]);
      }

      $meta_value = get_post_meta($post_id, $meta_key, true);

      if ($meta_value === '') {
        return new WP_Error('no_meta_found', 'No meta value found for the given key.', array('status' => 404));
      }

      return ['meta_value' => $meta_value];
    },
    'permission_callback' => '__return_true',
    'args' => [
      'post_id' => ['required' => true, 'type' => 'integer'],
      'meta_key' => ['required' => true, 'type' => 'string'],
    ],
  ]);
});