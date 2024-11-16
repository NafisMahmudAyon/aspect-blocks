<?php
if (!defined('ABSPATH'))
  exit();
class PGBlockPostText
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    // 
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      root_dir . 'build/blocks/text/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }


  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('wp-tailwind/text')) {
      wp_enqueue_script('wp_tailwind_block_scripts');
    }
    // global $wp_query;
    // $taxterm = get_queried_object();
    // global $postGridCssY;
    if (has_block('wp-tailwind/text')) {
      // $other = isset($attributes['other']) ? $attributes['other'] : [];
      // $otherOptions = isset($other['options']) ? $other['options'] : [];
      // $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;
      // $otherCopyContent = isset($otherOptions['copyContent']) ? $otherOptions['copyContent'] : "";
      // if ($otherCopyObj) {
      //   wp_enqueue_style('pg_block_styles');
      // }
    }




    // //* Visible condition
    ob_start();
    if (empty($wrapperTag)) :
      echo wp_kses_post($content);
    endif;
    if (!empty($wrapperTag)) :
?>
      <div class="" id="" <?php if (!empty($animateRules)): ?>
        data-animateOn="<?php echo esc_attr(json_encode($animateRules)) ?>" <?php endif; ?>
        <?php if (!empty($tooltipRules)): ?> data-tooltip="<?php echo esc_attr(json_encode($tooltipRules)) ?>" <?php endif; ?>
        <?php if (!empty($tiltRules)): ?> data-tilt="<?php echo esc_attr(json_encode($tiltRules)) ?>" <?php endif; ?>
        <?php if (!empty($typingTextRules)): ?> data-typed="<?php echo esc_attr(json_encode($typingTextRules)) ?>"
        <?php endif; ?> ">
  Hello fro
</div>
<?php
    endif;
    $html = ob_get_clean();
    $cleanedHtml = post_grid_clean_html($html);
    return $cleanedHtml;
  }
}

$BlockPostGrid = new PGBlockPostText();
