<?php
/*
  Plugin Name: Aspect Blocks
  Version: 1.1
  Author: nafismahmudayon
  Author URI: https://nafisbd.com/
  Description: WordPress Aspect Blocks.
  TExt Domain: aspect-blocks
  Plugin URI: https://github.com/NafisMahmudAyon/aspect-blocks
  License: GPLv2 or later
  License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

define(
  'ASPECT_BLOCKS_PLUGIN_URL',
  plugins_url('/', __FILE__)
);

define(
  'ASPECT_BLOCKS_PLUGIN_DIR',
  plugin_dir_path(__FILE__)
);

// Enqueue Tailwind CDN for frontend and editor
function aspectBlocks_enqueue_tailwind_cdn()
{
  // Enqueue Tailwind CDN for both editor and frontend
  wp_enqueue_script(
    'tailwind-cdn',
    ASPECT_BLOCKS_PLUGIN_URL . '/assets/js/tailwind.js',
    array(),
    '3.4.15',
    true // Load in footer
  );

  // Add inline script to initialize Tailwind with custom configuration
  $aspectBlocks_tailwind_config = "tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: {
            '50': '#edf6f7',
            '100': '#cbe2e2',
            '200': '#a9cdcf',
            '300': '#87b8bc',
            '400': '#65a3a9',
            '500': '#438e96',
            '600': '#38757a',
            '700': '#2c5c60',
            '800': '#204346',
            '900': '#142a2c',
            '950': '#081112'
          },
        }
      }
    }
  };";

  wp_add_inline_script('tailwind-cdn', $aspectBlocks_tailwind_config);

  // Enqueue additional CSS file
  // wp_enqueue_style(
  //   'tailwind-blocks-style',
  //   aspectBlocks_plugin_url . '/build/style.css',
  //   array(),
  //   '1.0',
  //   'all'
  // );
}
add_action('enqueue_block_assets', 'aspectBlocks_enqueue_tailwind_cdn'); // For frontend and editor

require_once(ASPECT_BLOCKS_PLUGIN_DIR . 'functions-blocks.php');
require_once(ASPECT_BLOCKS_PLUGIN_DIR . 'functions-rest.php');

// Register block types
function aspectBlocks_register_aspect_blocks()
{
  register_block_type(__DIR__ . '/build/blocks/text');
  register_block_type(__DIR__ . '/build/blocks/container');
  register_block_type(__DIR__ . '/build/blocks/accordion');
  register_block_type(__DIR__ . '/build/blocks/accordion-item');
  register_block_type(__DIR__ . '/build/blocks/post-title');
  register_block_type(__DIR__ . '/build/blocks/image');
}

add_action('init', 'aspectBlocks_register_aspect_blocks');