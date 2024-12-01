<?php
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
// var_dump($attributes);
$text = isset($attributes['text']) ? $attributes['text'] : [];
$textClass = isset($text['class']) ? $text['class'] : [];
$className = autoConcatenateClasses($textClass);
$textTag = isset($text['tag']) ? $text['tag'] : '';
$textId = isset($text['id']) ? $text['id'] : '';
$textContent = isset($text['content']) ? $text['content'] : '';
?>
<<?php echo esc_html($textTag); ?> class="<?php echo esc_attr($className); ?>" id="<?php echo esc_attr($textId); ?>">
  <?php echo wp_kses_post($textContent) ?>
</<?php echo esc_html($textTag); ?>>