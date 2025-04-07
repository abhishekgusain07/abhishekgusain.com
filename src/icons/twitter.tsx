import { cn } from "@/lib/utils";

const Twitter = ({
    className
}:{className ?: string}) => {
    return (
        <svg width="14" height="14" className={cn("mr-1.5", className)} data-icon="twitter">   <symbol id="ai:local:twitter" viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"></path></symbol><use href="#ai:local:twitter"></use>  </svg>
    )
}

export default Twitter;