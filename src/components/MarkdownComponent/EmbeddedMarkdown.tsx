
import { LinkIcon } from 'lucide-react';
import { styled, SvgIcon } from '@mui/material';
import { useState } from 'react';
import Markdown from '../Markdown';
import useEmbeddedMarkdown from '../../hooks/useEmbeddedMarkdown';
import { ObsidiousVault, slugifyFilepath } from 'remark-obsidious';
const StyledSpan = styled('span')(() => ({
  display: 'block',
  width: '100%',
  textAlign: 'right',
}));

type Props = {
    fileid: string;
    hash: string;
}

const EmbeddedMarkdown = (props:Props) => {
    const {fileid, hash} = props;
    const [content, setContent] = useState('loading...');

    useEmbeddedMarkdown(fileid, hash).then((text) => {
        if (!text) {
            setContent(`
                Something went wrong while fetching embedded content.
                file-id: ${fileid}
                hash params: ${hash}`);
            return
        }
        setContent(text)
    });

    const file = ObsidiousVault.getFileForId(fileid);
    if (!file) return null;
    const baseUrl = import.meta.env.BASE_URL;
    const url = `${baseUrl}${slugifyFilepath(file.filepath)}` + (hash ? '#' + hash : '');
    
    return (
        <div className={'obsidian-md-embed toc_exclude'} {...props}>
            <StyledSpan>
                <a href={`${url}`}>
                <SvgIcon fontSize="small"><LinkIcon /></SvgIcon>
                </a>
            </StyledSpan>
            <Markdown 
                sxProps={{
                        padding: 0,
                        margin: 0,
                        '& > p:first-of-type': {
                          margin: 0,
                          padding: 0,
                          display: 'inline',
                        },
                      }}
                    >
            {content}
            </Markdown>
        </div>
    )

}

export default EmbeddedMarkdown;