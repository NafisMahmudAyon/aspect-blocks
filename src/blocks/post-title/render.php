<?php
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}

$post_ID = isset($block->context["postId"])
  ? $block->context["postId"]
  : "";
$post_url = get_the_permalink($post_ID);
$the_post = get_post($post_ID);
$post_title = isset($the_post->{"post_title"}) ? $the_post->{"post_title"} : "Post Has No Title";
// var_dump($post_title);
$title = isset($attributes['title']) ? $attributes['title'] : [];
$titleClass = isset($title['class']) ? $title['class'] : [];
$className = autoConcatenateClasses($titleClass);
$titleLinkClass = isset($title['linkClass']) ? $title['linkClass'] : [];
$linkClassName = autoConcatenateClasses($titleLinkClass);
$titleTag = isset($title['tag']) ? $title['tag'] : '';
$titleLinkTo = isset($title['linkTo']) ? $title['linkTo'] : '';
$titleLinkTarget = isset($title['linkTarget']) ? $title['linkTarget'] : '_self';
$titleLinkMetaKey = isset($title['metaKey']) ? $title['metaKey'] : '';
$titleCustomUrl = isset($title['customUrl']) ? $title['customUrl'] : '#';
$titleId = isset($title['id']) ? $title['id'] : '';
$titleContent = isset($title['content']) ? $title['content'] : '';
$titleLinkToURL = "#";
if ($titleLinkTo === 'customUrl') {
  $titleLinkToURL = $titleCustomUrl;
} elseif ($titleLinkTo === 'postUrl') {
  $titleLinkToURL = $post_url;
} elseif ($titleLinkTo === 'homeUrl') {
  $titleLinkToURL = home_url();
} elseif ($titleLinkTo === 'customField') {
  $metaUrl =
    get_post_meta($post_ID, $titleLinkMetaKey, true);
  $titleLinkToURL = filter_var($metaUrl, FILTER_VALIDATE_URL) ? $metaUrl : $post_url;
} else {
  $titleLinkToURL = $post_url;
}
?>

<<?php echo esc_html($titleTag); ?> class="<?php echo esc_attr($className); ?>" id="<?php echo esc_attr($titleId); ?>">
  <?php if ($titleLinkTo) : ?>
  <a href="<?php echo esc_url($titleLinkToURL); ?>" target="<?php echo esc_attr($titleLinkTarget); ?>"
    class="<?php echo esc_attr($linkClassName); ?>">
    <?php echo wp_kses_post($post_title); ?>
  </a>
  <?php else : ?>
  <?php echo wp_kses_post($post_title) ?>
  <?php endif; ?>
</<?php echo esc_html($titleTag); ?>>