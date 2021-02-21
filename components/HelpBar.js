export default function HelpBar(props) {
    const helpCards
    return (
        <>
            {helpCards.map((element, index) => (
                <Accordion classes={{
                    root: classes.accordion
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index + 1}a-content`}
                        id={`panel${index + 1}a-header`}
                    >
                        <Typography className={classes.heading}>{element.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {element.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}