
import { styled } from "@mui/material/styles";
import { PencilIcon, GemIcon, InfoIcon, RocketIcon, SwordsIcon, CircleHelpIcon, CircleAlertIcon, FireExtinguisherIcon, BugIcon, ListIcon, StarIcon, BookIcon, WandSparklesIcon, CalendarIcon, HardHatIcon, QuoteIcon, ChevronRightIcon, ImageIcon } from "lucide-react";
import { Children, ReactNode, } from "react";

const CalloutIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pencil':
      case 'tip':
        return <PencilIcon />;
      case 'gem':
        return <GemIcon />;
      case 'info':
        return <InfoIcon />;
      case 'rocket':
        return <RocketIcon />;
      case 'swords':
        return <SwordsIcon />;
      case 'question':
        return <CircleHelpIcon />;
      case 'warning':
        return <CircleAlertIcon />;
      case 'danger':
        return <FireExtinguisherIcon />;
      case 'bug':
        return <BugIcon />;
      case 'example':
        return <ListIcon />;
      case 'star':
        return <StarIcon />;
      case 'book':
        return <BookIcon />;
      case 'magic':
        return <WandSparklesIcon />;
      case 'calendar':
        return <CalendarIcon />;
      case 'wip':
        return <HardHatIcon />;
      case 'image':
        return <ImageIcon />;
      default:
        return <QuoteIcon />;
    }
  };

  const StyledCalloutTitle = styled('p')(({ theme }) => ({
    width: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textTransform: 'capitalize',
    fontSize: '1.1rem',
    fontWeight: 700,
    '& > svg:first-of-type': {
      marginRight: '1rem',
      minWidth: '1.5rem',
    },
    '& > svg:last-of-type': {
      minWidth: '1.5rem',
    },
    ['& svg.lucide-chevron-right']:{
      marginLeft: '1rem',
      display: 'none',
    },
    color: theme.palette.text.primary,
  }));
  
  const StyledContent = styled('span')(() => ({
      overflow: 'hidden',
      width: '100%',
      flexDirection: 'column',
    }));

  type Props = {
    children: ReactNode;
    ['data-callout']: string;
    ['data-title']: string;
  };

  const CalloutTitle = (props: Props) => {
    const { 
      children, 
      ['data-callout']: callout, 
      ['data-title']: title, 
      ..._ 
    } = props;
    const childElements = Children.toArray(children);
    const restChildren = childElements.slice(1);
    const chevron = <ChevronRightIcon  />;

    const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
      if (!callout) return;
      event.currentTarget?.dispatchEvent(new Event('callout-toggle', { bubbles: true }));
    }

    return (<>
      <StyledCalloutTitle {..._} onClick={handleClick}>
          {CalloutIcon(callout)}
          {childElements[0] || callout}
          {chevron}
        </StyledCalloutTitle>
        <StyledContent>
        {restChildren}
        </StyledContent>
        </>);
  }

  export default CalloutTitle;