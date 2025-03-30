 ==readme.md==
 ---

# Markdown Cheatsheet

Obsidian has an excellent page on their custom markup here
https://help.obsidian.md/obsidian-flavored-markdown

---
### Page Headings


If you put text right above a divider with ==no line break== it will be rendered as an H2 
---

```markdown
Text right above a divider with ==hilighted text==. 
---
```


```markdown

# Lorem Ipsum Dolor 🚫
## Aenean consequat nulla 🚫
### Ut a leo nec purus ✅
#### Sed molestie sodales ✅
#####  Ut a leo nec purus consectetur fringilla ✅
######  Etiam vel odio in lacus pulvinar tempor eu ut nunc. ✅

```


---
### Text Emphasis

**You can bring** __attention to__ specific ~~text~~ by using the ==following codes==:


```markdown
**bold text**
__italics text__
~~strikethrough~~
==hilighted text==
```

---

### Citations / Footnotes

```md
Footnotes can be referenced using [^1] with some some extra text after.
They can span multiple lines [^2] and can use named references [^note]
```

Footnotes can be referenced using [^1] with some some extra text after.
They can span multiple lines [^2] and can use named references [^note]

---

### Tables
are created like so

```markdown

| Column A      |    Column B    |      Column C |
| :------------ | :------------: | ------------: |
| left aligned  | middle-aligned | right-aligned |
| col 2 is      |    centered    |           $12 |
| zebra stripes |    are neat    |            $1 |

```

| Column A      |    Column B    |      Column C |
| :------------ | :------------: | ------------: |
| left aligned  | middle-aligned | right-aligned |
| col 2 is      |    centered    |           $12 |
| zebra stripes |    are neat    |            $1 |

---
### Embedded Markdown
Yo Dawg, I hear you like markdown, so we embedded markdown in your markdown so you can read while you read ...

```markdown

# You can embed other markdownfiles by using their filename in the following way
# note, do not include the file extension

![[party boons]]

---

# You can embed just a specific heading by using:
![[war for the crown players guide#Languages]]

```

![[Party Boons]]


---

![[war for the crown players guide#Languages]]

---


### Embedded Images
You can also embed images in the same way
```markdown

Include the file extension for non markdown filetypes
![[arturo_basri.png]]

You may also apply an optional css class (if supported) by doing the following:
![[arturo_basri.png | avatar]]

```

![[arturo_basri.png]]


![[arturo_basri.png | avatar]]


---



### `[[ wiki-links ]]`

```markdown

You can create a special [[wiki-link]] to other files using the following syntax:

link to another markdown file with [[filename]]
[[filename | same link but with a custom title]]

same file but will link directly to the page heading
[[filename#header text goes here]]

The Obsidian.app will let you use "carot links", they won't work on the web, but they won't break anything, so if you find them useful in the app, feel free to use them.   [[2025_02_20#^286ed4]]

```

examples:
- [[2025_02_20]] - link to another markdown file
- [[2025_02_20 | same link but with a custom title]] - same link but with a custom title
- [[2025_02_20#Bad times at Basri's]] - link to a specific heading
- [[2025_02_20#^286ed4]] - Obsidian _carot linking_ (not supported by me, but shouldn't break anything)

---

### Callouts / Admonitions

Use callouts to include additional content without breaking the flow of your notes.

To create a callout, add `[!info]` to the first line of a blockquote, where `info` is the _type identifier_. The type identifier determines how the callout looks and feels. To see all available types, refer to [Supported types](https://help.obsidian.md/callouts#Supported types).

---

> [!info]
> Here's a callout block.
> It supports Markdown, Embeds, the Wikilinks, etc
> 
> ```markdown 
> > [!info] Here's a callout block.
> It supports Markdown, Embeds, the Wikilinks, etc
> ```

---

## Nested Callouts
Callouts can be nested

> [!question]+
> > [!swords]+
> > > [!success]-
> > > ![[periwinkle.png]]
> 
---

##### Callouts have an Initial display state

- default callout
	- > [!info]
- callout with custom title
	- > [!info] with a custom title
- initially folded
	- > [!info]- Initially folded callout
	  > inner callout text will be displayed or hidden accordingly
- initially expanded folding state
	- > [!info]+ Initially expanded callout
	  > inner callout text will be displayed or hidden accordingly

---

##### Available callout types

> [!pencil]

> [!tip]

> [!gem]

> [!info]

> [!success]

> [!rocket]

> [!swords]

> [!question]

> [!warning]

> [!danger]

> [!bug]

> [!example]

> [!star]

> [!book]

> [!magic]

> [!calendar]

> [!wip]

> [!image]

---

### You can share various structured language formats in the form of code blocks


```typescript
type CodeBlockProps = {
children?: ReactNode;
className?: string;
inline?: boolean;
};

const CodeBlock: FC<CodeBlockProps> = ({
children,
className,
inline,
}: CodeBlockProps) => {
const [text, setText] = useState<string | null>(null);
const { copy } = useCopyToClipboard(String(children));
const match = /language-(\w+)/.exec(className || '');
const codeLanguage = (match && match[1]) ?? 'plaintext';
return (
	<CodeFigure>
		<figcaption>
			{codeLanguage}{' '}
			<IconButton onClick={copy}>
			<CopyIcon style={{ width: '0.75rem', height: '0.75rem' }} />
			</IconButton>
		</figcaption>
		{parse(text ?? '')}
	</CodeFigure>
	);
};

export default CodeBlock;
```

---

### You can create Tasks lists

- [x] finish the mvp of this static site builder
- [x] add some documentation
- [x] cry
- [x] add npc images
- [ ] finish the other billion things on my list



---

### Regular block quotes are also still a thing!

```md
> “It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don’t keep your feet, there’s no knowing where you might be swept off to.”
```

> “It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don’t keep your feet, there’s no knowing where you might be swept off to.”

---

[^1]: My reference.

[^2]:
    Every new line should be prefixed with 2 spaces.  
    This allows you to have a footnote with multiple lines.

[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.
