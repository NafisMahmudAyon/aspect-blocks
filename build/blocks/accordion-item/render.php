<?php
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}
$accordionItem = isset($attributes['accordionItem']) ? $attributes['accordionItem'] : [];
$accordionItemClass = isset($accordionItem['class']) ? $accordionItem['class'] : '';
$className = autoConcatenateClasses($accordionItemClass);
$accordionItemHeaderClass = isset($accordionItem['accordionHeaderClass']) ? $accordionItem['accordionHeaderClass'] : '';
$accordionHeaderClassName = autoConcatenateClasses($accordionItemHeaderClass);
$accordionItemHeaderTitleClass = isset($accordionItem['accordionHeaderTitleClass']) ? $accordionItem['accordionHeaderTitleClass'] : '';
$accordionHeaderTitleClassName = autoConcatenateClasses($accordionItemHeaderTitleClass);
$accordionItemContentClass = isset($accordionItem['accordionContentClass']) ? $accordionItem['accordionContentClass'] : '';
$accordionContentClassName = autoConcatenateClasses($accordionItemContentClass);
$accordionItemIconClass = isset($accordionItem['accordionIconClass']) ? $accordionItem['accordionIconClass'] : '';
$accordionIconClassName = autoConcatenateClasses($accordionItemIconClass);
$accordionItemTag = isset($accordionItem['tag']) ? $accordionItem['tag'] : 'div';
$accordionItemHeaderTag = isset($accordionItem['headerTag']) ? $accordionItem['headerTag'] : 'div';
$accordionItemContentTag = isset($accordionItem['contentTag']) ? $accordionItem['contentTag'] : 'div';
$accordionItemHeaderTitle = isset($accordionItem['headerTitle']) ? $accordionItem['headerTitle'] : 'Accordion Item Header';
$accordionItemId = isset($accordionItem['id']) ? $accordionItem['id'] : '';
$accordionItemOpen = isset($accordionItem['open']) ? $accordionItem['open'] : 'false';
// var_dump($accordionItemOpen);
$accordionItemDisabled = isset($accordionItem['disabled']) ? $accordionItem['disabled'] : 'false';
$accordionItemIconClass = isset($accordionItem['iconClass']) ? $accordionItem['iconClass'] : '';
$accordionItemOpenIcon = isset($accordionItem['openIcon']) ? $accordionItem['openIcon'] : '';
$accordionItemCloseIcon = isset($accordionItem['closeIcon']) ? $accordionItem['closeIcon'] : '';
$accordionItemOpenIconType = isset($accordionItem['openIconType']) ? $accordionItem['openIconType'] : 'solid';
$accordionItemCloseIconType = isset($accordionItem['closeIconType']) ? $accordionItem['closeIconType'] : 'solid';
?>
<<?php echo esc_html($accordionItemTag); ?>
  class="tailwind-blocks tailwind-blocks-accordion-item <?php echo esc_attr($className); ?>"
  id="<?php echo esc_attr($accordionItemId); ?>" data-open="<?php echo esc_attr($accordionItemOpen); ?>">
  <<?php echo esc_html($accordionItemHeaderTag); ?>
    class="tailwind-blocks-accordion-header <?php echo esc_attr($accordionHeaderClassName); ?>">
    <span
      class="tailwind-blocks-accordion-header-title <?php echo esc_attr($accordionHeaderTitleClassName); ?>"><?php echo wp_kses_post($accordionItemHeaderTitle); ?>
    </span>
    <span class="tailwind-blocks-accordion-icon <?php echo esc_attr($accordionIconClassName); ?>"
      data-open-icon="<?php echo esc_attr($accordionItemOpenIcon); ?>"
      data-close-icon="<?php echo esc_attr($accordionItemCloseIcon); ?>"
      data-open-icon-type="<?php echo esc_attr($accordionItemOpenIconType); ?>"
      data-close-icon-type="<?php echo esc_attr($accordionItemCloseIconType); ?>">
      ▼</span>
  </<?php echo esc_html($accordionItemHeaderTag); ?>>
  <<?php echo esc_html($accordionItemContentTag); ?>
    class="tailwind-blocks-accordion-content <?php echo esc_attr($accordionContentClassName); ?>">
    <?php echo $content ?>
  </<?php echo esc_html($accordionItemContentTag); ?>>
</<?php echo esc_html($accordionItemTag); ?>>