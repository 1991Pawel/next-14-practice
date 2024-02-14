"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AuthCredentialsValidator = z.object({
	email: z.string().email(),
	password: z.string().min(8, { message: "password must be at least 8 characters long." }),
});

type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;

const Page = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver,
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		console.log(email, password);
	};
	return (
		<>
			<div className="iems-center container relative flex flex-col justify-center pt-20 lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="text center flex flex-col items-center space-y-2">
						<Icons.logo className="w20 h-20" />
						<h1 className="text-2xl font-bold">Create account</h1>
						<Link
							className={buttonVariants({
								variant: "link",
								className: "text-blue-400",
							})}
							href="/sign-in"
						>
							Already have an account? Sign-in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid gap-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="email">Email</Label>
									<Input
										{...register("email")}
										placeholder="you@example.com"
										className={cn({
											"focus-visible:ring-red-500": errors.email,
										})}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="password">Password</Label>
									<Input
										{...register("password")}
										type="password"
										placeholder="Password"
										className={cn({
											"focus-visible:ring-red-500": errors.password,
										})}
									/>
								</div>
								<Button>Sign up</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
function zodResolver(
	values: FieldValues,
	context: any,
	options: ResolverOptions<FieldValues>,
): ResolverResult<FieldValues> | Promise<ResolverResult<FieldValues>> {
	throw new Error("Function not implemented.");
}
