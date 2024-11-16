<?php
/*
Plugin Name: WP Tailwind Blocks
Plugin URI: https://comboblocks.com/
Description: Post Grid is extremely easy to use for creating grid-layout and post-layout. Also, we're offering many small blocks with extensive flexibility.
Version: 2.3.0
Author: PickPlugins
Author URI: https://www.pickplugins.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH'))
  exit; // if direct access 

if (!class_exists('PostGrid')) {
  class PostGrid
  {
    public function __construct()
    {
      define('root_url', plugins_url('/', __FILE__));
      define('root_dir', plugin_dir_path(__FILE__));
      define('root_basename', plugin_basename(__FILE__));
      define('root_name', 'WP Tailwind Blocks');
      define('post_grid_version', '2.3.0');
      define('post_grid_server_url', 'https://pickplugins.com/demo/post-grid/');
      $this->load_blocks();

      add_action('wp_enqueue_scripts', array($this, '_scripts_front'));

      // add_action('plugins_loaded', array($this, '_textdomain'));
    }

    public function load_blocks()
    {
      // if (!in_array('post-grid/text', $disabled)) {
      require_once(root_dir . 'includes/blocks/text/index.php');
      error_log("load");
      // }
    }

    // public function _textdomain()
    // {

    //   $locale = apply_filters('plugin_locale', get_locale(), 'post-grid');
    //   load_textdomain('post-grid', WP_LANG_DIR . '/post-grid/post-grid-' . $locale . '.mo');

    //   load_plugin_textdomain('post-grid', false, plugin_basename(dirname(__FILE__)) . '/languages/');
    // }

    public function _scripts_front()
    {
      // wp_enqueue_script('jquery');
      wp_register_script('wp_tailwind_block_scripts', root_url . 'build/front-scripts.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
    }
  }
}

function post_grid_clean_html($html)
{
  $cleanedHtml = preg_replace('/\s+/', ' ', $html);

  return $cleanedHtml;
}

new PostGrid();