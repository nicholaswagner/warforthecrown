### Suspendisse dapibus condimentum ante
Suspendisse dapibus condimentum ante, vel semper purus pellentesque non. Vivamus efficitur maximus est nec molestie. Quisque accumsan quis felis quis posuere. Cras vel leo interdum, vulputate velit dignissim, ultricies ligula.

> Aenean consequat nulla lacinia lacus pellentesque, id fringilla eros elementum. In maximus pharetra massa non scelerisque. Ut a leo nec purus consectetur fringilla. Etiam vel odio in lacus pulvinar tempor eu ut nunc.

---
# Nested Callouts
###### open callouts

  > [!Book]+ Who doesn't love books? 
> **bold** ==block quote== containing _another block_
> quote which contains a ~~strikethrough item~~ and a list.
> > [!Question]+ == This text should be hilighted ==
> >
> > 1. Item **One**
> > 2. Item Two
> > > [!Warning]+
> > >    
> > > The Warning callout has no title.
> Here is an embeddedd image of Arturo
> ![[arturo.png]]
> ^ It should be right here.   
>

---

###### closed callouts
  > [!Book]- Who doesn't love books? 
> **bold** ==block quote== containing _another block_
> quote which contains a ~~strikethrough item~~ and a list.
> > [!Question]- == This text should be hilighted ==
> >
> > 1. Item **One**
> > 2. Item Two
> > > [!Warning]-
> > >    
> > > The Warning callout has no title.
> Here is an embeddedd image of Arturo
> ![[arturo.png]]
> ^ It should be right here.   
>

---

### Callout Open with Embedded Image

> [!info]+ Info
> ==Whatever else you want to say== goes on the following lines.
> **Bold** _Italics_ and ~~strikethrough~~ should also work,
> And you should be able to embed images
> ![[castle.png]]
> 

---

```md
Text right above a divider with ==hilighted text==. 
---
```



Text right above a divider with ==hilighted text==. 
---



---

> [!gem]- Yo Dawg, I hear you like obsidian embeds, 
> so i put your embed inside of an embed so you can read while you read
> ![[castle.png]]

---

#### Markdown Links
Links to internal files:


- [[block_level_elements]] - A link to `top level folder/second level folder/callouts.md`
- [[block_level_elements#an_example_callout]] - same file but linking directly to the "example callout heading"

---

### An Embedded Markdown file
![[block_level_elements#an_example_callout]]

---

#### Code Example

```ts
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

useEffect(() => {
	codeToHtml(String(children), {
		lang: codeLanguage,
		theme: 'tokyo-night',
	}).then((highlightedCode) => {
		setText(highlightedCode);
	});
	}, [children, codeLanguage, text]);

if (inline || !match) return <code className={className}>{children}</code>;

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
#### Some Table Data


| password | length        | num_chars | num_digits |
| -------- | ------------- | --------- | ---------- |
| 2        | 123456        | 6         | 0          |
| 3        | password      | 8         | 8          |
| 4        | 12345678      | 8         | 0          |
| 5        | qwerty        | 6         | 6          |
| 6        | 123456789     | 9         | 0          |
| 7        | 12345         | 5         | 0          |
| 8        | 1234          | 4         | 0          |
| 9        | 111111        | 6         | 0          |
| 10       | 1234567       | 7         | 0          |

---






Suspendisse dapibus condimentum ante, vel semper purus pellentesque non. Vivamus efficitur maximus est nec molestie. Quisque accumsan quis felis quis posuere. Cras vel leo interdum, vulputate velit dignissim, ultricies ligula. Curabitur bibendum interdum fringilla. Praesent tempus purus sit amet odio blandit, vel efficitur urna feugiat. Vestibulum vehicula sit amet ligula eget scelerisque. Aenean varius molestie odio, et sodales erat posuere eget. Quisque neque elit, blandit mattis nulla vel, posuere finibus magna.

Fusce condimentum leo lectus, non auctor erat ullamcorper at. Vivamus sodales est id purus sagittis tempor. Vivamus sollicitudin ac libero eget dictum. Suspendisse eget leo vitae libero commodo malesuada a eu lectus. Nunc volutpat odio elit, nec vestibulum odio sagittis sed. Quisque sed diam enim. Aliquam porta pretium commodo. Praesent ultrices ipsum et urna maximus sodales. Ut in viverra urna. In hac habitasse platea dictumst.