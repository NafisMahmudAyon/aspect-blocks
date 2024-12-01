<?php
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$accordion = isset($attributes['accordion']) ? $attributes['accordion'] : [];
$accordionClass = isset($accordion['class']) ? $accordion['class'] : '';
$className = autoConcatenateClasses($accordionClass);
$accordionTag = isset($accordion['tag']) ? $accordion['tag'] : '';
$accordionId = isset($accordion['id']) ? $accordion['id'] : '';
$accordionIsMultiple = isset($accordion['multiple']) ? $accordion['multiple'] : 'false';
?>
<<?php echo esc_html($accordionTag); ?>
  class="tailwind-blocks tailwind-blocks-accordion <?php echo esc_attr($className); ?>"
  id="<?php echo esc_attr($accordionId); ?>" data-multiple="<?php echo esc_attr($accordionIsMultiple); ?>">
  <?php echo $content ?>
</<?php echo esc_html($accordionTag); ?>>