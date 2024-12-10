<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
// var_dump($attributes);
$aspectBlocksText = $attributes['text'] ?? [];
$aspectBlocksTextClass = $aspectBlocksText['class'] ?? [];
$aspectBlocksTextClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksTextClass);
$aspectBlocksTextTag = $aspectBlocksText['tag'] ?? '';
$aspectBlocksTextId = $aspectBlocksText['id'] ?? '';
$aspectBlocksTextContent = $aspectBlocksText['content'] ?? '';

?>
<<?php echo esc_html($aspectBlocksTextTag); ?> class="<?php echo esc_attr($aspectBlocksTextClassName); ?>"
  id="<?php echo esc_attr($aspectBlocksTextId); ?>">
  <?php echo wp_kses_post($aspectBlocksTextContent) ?>
</<?php echo esc_html($aspectBlocksTextTag); ?>>