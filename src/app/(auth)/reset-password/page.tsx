import ResetPasswordForm from "./_components/form";
import AuthCard from "../_components/card";

export default function ForgotPasswordPage() {
	return (
		<AuthCard bgColor="bg-white pb-12 overflow-y-auto" title="Reset Password">
			<ResetPasswordForm />
		</AuthCard>
	);
}
