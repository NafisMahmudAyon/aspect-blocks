<?php
/*
  Plugin Name: Brad's Boilerplate Block Plugin
  Version: 1.0
  Author: Brad
  Author URI: https://github.com/LearnWebCode
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

// Enqueue Tailwind CDN for frontend and editor
function enqueue_tailwind_cdn()
{
  // Enqueue Tailwind CDN for both editor and frontend
  wp_enqueue_script(
    'tailwind-cdn',
    'https://cdn.tailwindcss.com',
    array(),
    null,
    true // Load in footer
  );

  // Add inline script to initialize Tailwind (optional for custom configuration)
  wp_add_inline_script('tailwind-cdn', 'tailwind.config = { /* Add your Tailwind config here */ };');
}
add_action('enqueue_block_assets', 'enqueue_tailwind_cdn'); // For frontend and editor

// Register block types
function register_wp_tailwind_blocks()
{
  register_block_type(__DIR__ . '/build/demo');
  register_block_type(__DIR__ . '/build/test');
  register_block_type(__DIR__ . '/build/text');
}
add_action('init', 'register_wp_tailwind_blocks');