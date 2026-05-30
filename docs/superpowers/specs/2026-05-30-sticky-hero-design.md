# Sticky Hero Image and Page Layout Specification

This specification documents the changes required to implement a sticky/overlay hero image effect on all category pages, with the "Административни" page updated to use a new custom hero image.

## Proposed Changes

### Image Asset Copy
* Copy `C:\Users\user2\Downloads\DSC_0500_result 3_2.webp` to `c:\Users\user2\Desktop\coding\studio-2000-architecure\public\category-administrative.webp`.

### 1. `app/administrativni/page.tsx`
* Update the `heroImage` source path from `/category-administrative.jpg` to `/category-administrative.webp`.

### 2. `components/category-page.tsx`
* Modify the `CategoryPage` layout to support the sticky overlay behavior:
  * Give the title section `relative z-20 bg-background` to ensure it stays in the normal flow above the image and has an opaque white background.
  * Give the hero image section `sticky top-20 z-10 w-full overflow-hidden` to pin it below the header as the user scrolls.
  * Ensure the `Image` component is styled with `object-cover object-top` to display the top of the image fully.
  * Wrap the project grid section and `SiteFooter` in a single `relative z-20 bg-background` container so they scroll over the sticky hero image.

## Verification
* Verify that the image is correctly copied and displays on the `http://localhost:3000/administrativni` page.
* Confirm that scrolling pins the hero image under the site header while the project grid overlays it.
