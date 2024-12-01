<?php
/*
  Plugin Name: Tailwind Blocks
  Version: 1.0
  Author: NafisMahmudAyon
  Author URI: https://nafisbd.com/
  Description: WordPress Tailwind Blocks.
  TExt Domain: tailwind-blocks
  Plugin URI: https://github.com/NafisMahmudAyon/
  License: GPLv2 or later
  License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

define('tailwind_blocks_plugin_url',
  plugins_url('/', __FILE__)
);
// Enqueue Tailwind CDN for frontend and editor
function enqueue_tailwind_cdn()
{
  // Enqueue Tailwind CDN for both editor and frontend
  wp_enqueue_script(
    'tailwind-cdn',
    tailwind_blocks_plugin_url.'/assets/tailwind.js',
    array(),
    '3.4.15',
    true // Load in footer
  );

  // Add inline script to initialize Tailwind with custom configuration
  $tailwind_config = <<<EOT
tailwind.config = {
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
};
EOT;
  wp_add_inline_script('tailwind-cdn', $tailwind_config);
  
  // Enqueue additional CSS file
  // wp_enqueue_style(
  //   'tailwind-blocks-style',
  //   tailwind_blocks_plugin_url . '/build/style.css',
  //   array(),
  //   '1.0',
  //   'all'
  // );
}
add_action('enqueue_block_assets', 'enqueue_tailwind_cdn'); // For frontend and editor



require_once(__DIR__ . '/functions-blocks.php');

// Register block types
function register_tailwind_blocks()
{
  register_block_type(__DIR__ . '/build/blocks/text');
  register_block_type(__DIR__ . '/build/blocks/container');
  register_block_type(__DIR__ . '/build/blocks/accordion');
  register_block_type(__DIR__ . '/build/blocks/accordion-item');
}

add_action('init', 'register_tailwind_blocks');