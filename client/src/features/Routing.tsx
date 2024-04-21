import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {QuizList} from "./quiz/QuizList";
import {ErrorPage} from "./error/ErrorPage";
import {QuestionsSolveForm} from "./questions/QuestionsSolveForm";
import {LoginPage} from "./login/LoginPage";
import {useIsLogged} from "../hooks/useIsLogged";
import {QuizGeneralCreateForm} from "./quiz/QuizGeneralCreateForm";
import {ResultList} from "./result/ResultList";
import {MyQuizList} from "./quiz/MyQuizList";
import {SignUpPage} from "./signup/SignUpPage";

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/signup',
                element: <SignUpPage/>
            },
            {
                path: '*',
                element: <Navigate to="/login" replace/>
            }
        ]
    }
];
const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/quiz',
                element: <QuizList/>
            },
            {
                path: '/quiz/new',
                element: <QuizGeneralCreateForm/>
            },
            {
                path: '/quiz/my',
                element: <MyQuizList/>
            },
            {
                path: '/quiz/:id',
                element: <QuestionsSolveForm/>
            },
            {
                path: '/quiz/results',
                element: <ResultList/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]
export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}