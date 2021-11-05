import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StyledPanel = styled.div`
    background-color: #eeeeee;
    flex-grow: ${({hidden}) => hidden ? 0 : 1};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: auto;
`;

const StylePanelContentWrapper = styled(Box)`
    padding: 0;
    width: 100%;
`;

function TabPanel(props: TabPanelProps) {
    const { children, value, index} = props;

    return (
        <StyledPanel
            role="tabpanel"
            hidden={value !== index}
        >
            {value === index && (
                <StylePanelContentWrapper>
                    {children}
                </StylePanelContentWrapper>
            )}
        </StyledPanel>
    );
}

const StyleTabsWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

type BasicTabsProps = {
    tabs: {
        title: string,
        content: any
    }[]
}

function BasicTabs({tabs}: BasicTabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyleTabsWrapper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                >
                    {tabs.map((tab, index) => (
                        <Tab label={tab.title} key={index} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel value={value} index={index} key={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </StyleTabsWrapper>
    );
}

export default BasicTabs;