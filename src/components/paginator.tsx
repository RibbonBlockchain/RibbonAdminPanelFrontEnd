import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
	url_hash?: string;
	current_page: number;
	total_pages: number;
	handlePaginate: (page: number) => void;
	containerClass?: string;
};

const Paginator: React.FC<Props> = (props) => {
	return (
		<Pagination className={cn(props.containerClass)}>
			<PaginationContent className="gap-x-2">
				<PaginationItem
					onClick={
						props.current_page - 1 > 0
							? () => props.handlePaginate(props.current_page - 1)
							: () => {}
					}
				>
					<PaginationPrevious
						href={props.url_hash ? `#${props.url_hash}` : "#"}
						className="border-none"
					/>
				</PaginationItem>

				{props.current_page - 2 > 0 && (
					<PaginationItem
						onClick={() => props.handlePaginate(props.current_page - 2)}
					>
						<PaginationLink href={props.url_hash ? `#${props.url_hash}` : "#"}>
							{props.current_page - 2}
						</PaginationLink>
					</PaginationItem>
				)}
				{props.current_page - 1 > 0 && (
					<PaginationItem
						onClick={() => props.handlePaginate(props.current_page - 1)}
					>
						<PaginationLink href={props.url_hash ? `#${props.url_hash}` : "#"}>
							{props.current_page - 1}
						</PaginationLink>
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationLink
						href={props.url_hash ? `#${props.url_hash}` : "#"}
						isActive={true}
					>
						{props.current_page || 1}
					</PaginationLink>
				</PaginationItem>

				{props.current_page + 1 <= props.total_pages && (
					<PaginationItem
						onClick={() => props.handlePaginate(props.current_page + 1)}
					>
						<PaginationLink href={props.url_hash ? `#${props.url_hash}` : "#"}>
							{props.current_page + 1}
						</PaginationLink>
					</PaginationItem>
				)}

				{props.current_page + 2 <= props.total_pages && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem
					onClick={
						props.current_page < props.total_pages
							? () => props.handlePaginate(props.current_page + 1)
							: () => {}
					}
				>
					<PaginationNext
						href={props.url_hash ? `#${props.url_hash}` : "#"}
						className="border-none"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default Paginator;
