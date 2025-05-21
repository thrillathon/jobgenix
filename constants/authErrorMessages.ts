export const AUTH_ERROR_MESSAGES: Record<string, string> = {
    user_exists: "User already exists. Please try logging in.",
    user_not_found: "No account found with this email. Please sign up or check your credentials.",
    incorrect_password: "The password you entered is incorrect. Please try again.",
    validation_error: "Invalid input. Ensure all fields are correctly filled.",
    unknown_error: "An unexpected error occurred. Please try again later.",
    OAuthSignin: "Error signing in with OAuth. Please try again.",
    OAuthCallbackError: "OAuth callback failed. Please try again later.",
    OAuthCreateAccount: "Unable to create an account with OAuth. Try another method.",
    EmailCreateAccount: "Error creating an account with email. Please check your details.",
    Callback: "Authentication callback error. Please retry.",
    EmailSignin: "Error signing in with email. Check your email and try again.",
    CredentialsSignin: "Invalid email or password. Please try again.",
    SessionRequired: "Session is required to access this page. Please sign in first.",
    Configuration: "There seems to be a configuration issue. Please contact support.",
    AccessDenied: "Access Denied! You don't have permission to access this resource.",
    Verification: "The verification link is invalid or has expired. Please try again.",
    OAuthAccountNotLinked: "This account is not linked to your profile. Please sign in with the provider you used to create your account or link this provider in your account settings.",
    Default: "An unknown error occurred. Please try again later.",
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_MESSAGES;
