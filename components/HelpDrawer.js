import DesktopHelpDrawer from './DesktopHelpDrawer';
import MobileHelpDrawer from './MobileHelpDrawer';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function HelpDrawer(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return matches ? <DesktopHelpDrawer /> : <MobileHelpDrawer />;
}