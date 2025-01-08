import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/login", "/signup(.*)"],
  ignoredRoutes: ["/api/webhooks/clerk"]
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
