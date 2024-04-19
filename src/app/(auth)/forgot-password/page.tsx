import AuthCard from "../_components/card";
import ForgotPasswordForm from "./_components/form";

export default function ForgotPasswordPage() {
	return (
		<AuthCard bgColor="bg-white pb-12" title="Forgot Password">
			<ForgotPasswordForm />
		</AuthCard>
	);
}
