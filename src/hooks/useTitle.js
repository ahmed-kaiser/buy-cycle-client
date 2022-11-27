import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        window.document.title = `${title} | BuyCycle`;
    }, [title]);
};

export default useTitle;