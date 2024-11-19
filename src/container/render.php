<?php
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$container = isset($attributes['container']) ? $attributes['container'] : [];
$containerClass = isset($container['class']) ? $container['class'] : '';
$containerTag = isset($container['tag']) ? $container['tag'] : '';
$containerId = isset($container['id']) ? $container['id'] : '';
?>
<<?php echo esc_html($containerTag); ?> class="<?php echo esc_attr($containerClass); ?>"
  id="<?php echo esc_attr($containerId); ?>">
  <?php echo esc_html($content) ?>
</<?php echo esc_html($containerTag); ?>>