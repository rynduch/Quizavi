import {useNavigate} from "react-router-dom";
import {NavLink} from "@mantine/core";
import {IconBulb, IconPaperclip, IconPlus, IconTimeline} from "@tabler/icons-react";

export const AppNavBar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavLink
                onClick={() => navigate('/quiz')}
                href="#required-for-focus"
                label="Quizzes"
                leftSection={<IconBulb size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate('/quiz/my')}
                href="#required-for-focus"
                label="My Quizzes"
                leftSection={<IconPaperclip size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate('/quiz/new')}
                href="#required-for-focus"
                label="Create Quiz"
                leftSection={<IconPlus size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate('/quiz/results')}
                href="#required-for-focus"
                label="Results"
                leftSection={<IconTimeline size="1rem" stroke={1.5}/>}
            />
        </div>
    );
}