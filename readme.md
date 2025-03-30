#### ==readme.md==

---

# Markdown Cheatsheet


Obsidian has an excellent page on their custom markup:
https://help.obsidian.md/obsidian-flavored-markdown

---
### Page Headings

[!warning] Please do not use Level 1 or Level 2 headings
 `# heading title` or `## heading title` as those will be reserved for a different purpose. 

```md

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


```md
**bold text**
__italics text__
~~strikethrough~~
==hilighted text==
```


---

If you put text right above a divider with ==no line break== it will create this effect. 
---

```md
Text right above a divider with ==hilighted text==. 
---
```

---
### Tables
are created like so

```md

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
### Yo Dawg, I hear you like markdown, so we added markdown embeds to your markdown so you can read while you read ...

```md
# You can embed other markdown files in the current markdown file by using the following syntax

![[party boons]]

---

# You can embed just a specific heading by doing:
![[war for the crown players guide#Languages]]

```

![[Party Boons]]


---

![[war for the crown players guide#Languages]]

---

### `[[ wiki-links ]]`

```md

You can create a special [[wiki-link]] to other files using the following syntax:

link to another markdown file with [[filename]]
[[filename | same link but with a custom title]]

same file but will link directly to the page heading
[[filename#header text goes here]]

The Obsidian.app will let you use "carot links", they won't work on the web, but they won't break anything, so if you find them useful in the app, feel free to use them.   [[2025_02_20#^286ed4]]

```

wikilink examples:
- [[2025_02_20]] - link to another markdown file
- [[2025_02_20 | same link but with a custom title]] - same link but with a custom title
- [[2025_02_20#Bad times at Basri's]] - link to a specific heading
- [[2025_02_20#^286ed4]] - Obsidian _carot linking_ (not supported by me, but shouldn't break anything)

---

### Callouts / Admonitions

Use callouts to include additional content without breaking the flow of your notes.

To create a callout, add `[!info]` to the first line of a blockquote, where `info` is the _type identifier_. The type identifier determines how the callout looks and feels. To see all available types, refer to [Supported types](https://help.obsidian.md/callouts#Supported types).

```markdown
> [!info]
> Here's a callout block.
> It supports **Markdown**, [[Internal link|Wikilinks]], and [[Embed files|embeds]]!
> ![[Engelbart.jpg]]
```


> [!tip] Tip callout

> [!star]- Star callout which is initially folded
> I dunno if further lines have the > as well or not
> i guess they do?

> [!book]+ Book callout which is initially open
> Cras semper justo diam, id elementum dolor venenatis nec. Aenean consequat nulla lacinia lacus pellentesque, id fringilla eros elementum. In maximus pharetra massa non scelerisque. Ut a leo nec purus consectetur fringilla. Etiam vel odio in lacus pulvinar tempor eu ut nunc.

> [!swords] I've included a few custom callout icons and i'll update this list with them soon-ish
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sodales elit eget rhoncus. Integer finibus pharetra gravida. Aenean eget laoreet ante. ![[caritas-zespire-side.png]] Cras semper justo diam, id elementum dolor venenatis nec. Aenean consequat nulla lacinia lacus pellentesque, id fringilla eros elementum. In maximus pharetra massa non scelerisque. Ut a leo nec purus consectetur fringilla. Etiam vel odio in lacus pulvinar tempor eu ut nunc.


---


### You can share various structured language formats in the form of codeblocks


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

#### Regular block quotes are also still a thing!

```md
> _“It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don’t keep your feet, there’s no knowing where you might be swept off to.”_
```

> _“It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don’t keep your feet, there’s no knowing where you might be swept off to.”_

---
#### Citations

```md
Footnotes can be referenced using [^1] with some some extra text after.
They can span multiple lines [^2] and can use named references [^note]
```

Footnotes can be referenced using [^1] with some some extra text after.
They can span multiple lines [^2] and can use named references [^note]

---

[^1]: My reference.

[^2]:
    Every new line should be prefixed with 2 spaces.  
    This allows you to have a footnote with multiple lines.

[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.
