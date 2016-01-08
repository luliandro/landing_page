# A quick helper for those posting to hhg...


## Before You Begin
- Gather all images you'd like to include. Ensure they are cropped and edited as you wish and named appropriately.
- Choose one image to become the featured image; this must be at least 1200px wide, but no more than 1400px wide. *The featured image appears alongside the title and subtitle across the site, and is also used in the feature header, overlaid with title, subtitle, date and read time. **The featured image will be cropped to the correct size for display automatically.***


## Log In
Log into the magazine dashboard area: [hevnly holy grail login page](http://blog.hevnlyholygrail.com/wp-login.php)

**Note:** You should already have login details - if not, please email Mat ([mat@hevnly.com](mailto:mat@hevnly.com)) to get an editor's account set up.


## Compose Your Post
1. Once logged in, choose Posts > Add New from the dashboard navigation.

2. I like to add all images now, so they're ready to insert as I need them. Click Add Media, then select the Upload Files tab. Drag and drop (or navigate to) files to be uploaded. They will be saved into the Media Library automatically. Select each image in turn, and update/add the following information:
  - Title
  - Caption
  - Alt Text
  - Description
  - Alignment (set this to none)
  - Link To (set this to none)
  - Size (Full Size)

To close the media popup without inserting an image, use the cross in the top right corner - else click "Insert into post" to add whichever image(s) currently selected into post.

3. Add content. This is much, much easier in the "Text" view than in the "Visual" view! Please note the following:
  - Ensure each paragraph begins with a `<p>` and ends with a `</p>`
  - It shouldn't be necessary to add additional spacing using `<br>` or `&nbsp;`
  - See additional styling notes below...

4. Include a subtitle. Under the "Custom Fields" panel, select "subtitle" from the dropdown. Briefly introduce your feature - this will appear alongside the title and image across the site, and should be enticing and informative. Try to say everything in less than 140 characters!

5. Choose relevant tags. Pick out some key words from your feature. These will be used in helping readers to filter their search results. Aim for between 5 and 10 tags. Existing tags will appear as suggestions as you type.

6. Select appropriate Post Type. This will be either "person", "place", or "product".

7. Set Featured Image. This should have been uploaded at the beginning of the process; select correct image from Media Library and set.

8. Preview post. Use the button in the panel on the top right to review post content and layout. Either save draft, publish immediately, or schedule to be published at a later date.

**Note:** The read time is calculated automatically based on word count.


## Styling Elements Within Post

**PARAGRAPHS**

```
<p>paragraph content goes in here</p>
<p>second paragraph goes directly underneath</p>
```

***example***
<p>paragraph content goes in here</p>
<p>second paragraph goes directly underneath</p>


**HEADINGS**

```
<h1>h1 is the largest heading</h1>
<h2>h2 is slightly smaller</h2>
<h3>h3 is smaller still</h3>
<h4>h4 even smaller still</h4>
<h5>as is h5</h5>
<h6>right the way down to h6</h6>

```


**QUOTE**

`<blockquote>this is a quote</blockquote>`

***example***

<blockquote>this is a quote</blockquote>

**Note:** Wordpress actually outputs this: `<blockquote><p>this is a quote</p></blockquote>` where the `<p>` tags are styled and necessary.


**IMAGES WITHOUT CAPTION**

`<img class="alignnone size-full wp-image-391" src="" alt="this is the caption" />`


**IMAGES WITH CAPTION**

Use the Wordpress caption shortcode -

`[caption id="attachment_391" width="100"]<img class="alignnone size-full wp-image-391" src="" alt="this is the caption" /> caption for image with id 391 goes here[/caption]`

`[caption id="attachment_45" width="100"]<img class="alignnone size-full wp-image-45" src="" alt="this is the caption" /> caption for image with id 45 goes here[/caption]`

... Where the caption id number matches the number in the wp-image class. Width is required to display the caption, but any number in there should work.

**ORDERED LIST**

```
<ol>
<li>list item 1</li>
<li>list item 2</li>
<li>list item 3</li>
<li>list item 4</li>
</ol>
```

***example***

<ol>
<li>list item 1</li>
<li>list item 2</li>
<li>list item 3</li>
<li>list item 4</li>
</ol>

**UNORDERED LIST**

```
<ul>
<li>list item 1</li>
<li>list item 2</li>
<li>list item 3</li>
<li>list item 4</li>
</ul>
```

***example***

<ul>
<li>list item 1</li>
<li>list item 2</li>
<li>list item 3</li>
<li>list item 4</li>
</ul>

