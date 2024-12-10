<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}

$aspectBlocksContainer = $attributes['container'] ?? [];
$aspectBlocksContainerClass = $aspectBlocksContainer['class'] ?? '';
$aspectBlocksContainerClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksContainerClass);
$aspectBlocksContainerTag = $aspectBlocksContainer['tag'] ?? '';
$aspectBlocksContainerId = $aspectBlocksContainer['id'] ?? '';

?>
<<?php echo esc_html($aspectBlocksContainerTag); ?> class="<?php echo esc_attr($aspectBlocksContainerClassName); ?>"
  id="<?php echo esc_attr($aspectBlocksContainerId); ?>">
  <?php echo wp_kses_post($content); ?>
</<?php echo esc_html($aspectBlocksContainerTag); ?>>