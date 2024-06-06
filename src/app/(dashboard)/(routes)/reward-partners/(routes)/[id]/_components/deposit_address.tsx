"use client";

import React from "react";
import { RxCopy } from "react-icons/rx";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import { ImSpinner3 } from "react-icons/im";

const DepositAddress = () => {
	const addressRef = React.useRef<HTMLSpanElement>(null);
	const [copied, setCopied] = React.useState(false);
	function copyToClipboard() {
		if (addressRef.current) {
			navigator.clipboard.writeText(addressRef.current.innerText);
		}
		setCopied(true);
	}

	React.useEffect(() => {
		const timer = setTimeout(() => setCopied(false), 1000);

		return () => clearTimeout(timer);
	}, [copied]);

	return (
		<>
			<div className="w-full">
				<h3 className="text-xs">Deposit address</h3>
				<div className="mt-1 flex items-center gap-x-4 rounded-xl border pl-4">
					<span ref={addressRef} className="truncate text-sm font-bold">
						0x27f103D1EACC30f23DdDc80606243F17f818eAcb
					</span>
					<Button
						variant={"plain"}
						className="min-w-fit gap-x-1 hover:text-primary"
						onClick={copyToClipboard}
					>
						{copied ? (
							<>
								<IoCheckmarkDoneSharp className="text-xl" /> Copied
							</>
						) : (
							<>
								<RxCopy className="rotate-90 text-xl" /> Copy
							</>
						)}
					</Button>
				</div>
			</div>
		</>
	);
};

export default DepositAddress;
