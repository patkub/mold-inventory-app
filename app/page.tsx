import { LoginRequired } from "@/components/login-required"
import { MoldDashboard } from "@/components/mold-dashboard"
import { MoldProviderDB } from "@/components/mold-providers/mold-provider-db"
import { ToastProvider } from "@/components/toast-provider"

export default function Home() {
  return (
    <main className="grow bg-gray-50 dark:bg-gray-900">
      <LoginRequired>
        <ToastProvider>
          <MoldProviderDB>
            <MoldDashboard />
          </MoldProviderDB>
        </ToastProvider>
      </LoginRequired>
    </main>
  )
}
