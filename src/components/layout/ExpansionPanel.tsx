import React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from '@emotion/styled';

const StyledAccordion = styled(Accordion)`
    //flex-grow: ${({expanded}) => expanded ? 1 : 0};
`;

const StyledAccordionDetails = styled(AccordionDetails)`
    background-color: #eeeeee;
    height: 100vh;
`;

type ExpansionPanelProps = {
    title: string;
    children: any;
    expanded: boolean;
    onChange: () => void;
}

function ExpansionPanel({title, children, expanded, onChange}: ExpansionPanelProps) {

    return (
            <StyledAccordion
                square
                disableGutters
                expanded={expanded}
                onChange={onChange}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    {title}
                </AccordionSummary>
                <StyledAccordionDetails>
                    {children}
                </StyledAccordionDetails>
            </StyledAccordion>
    );
}

export default ExpansionPanel;
