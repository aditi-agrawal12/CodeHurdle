// import * as React from "react"

// function Card({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       className={`flex flex-col gap-6 rounded-2xl border border-purple-900/20 bg-gradient-to-br from-gray-900 to-purple-950 p-6 shadow-lg hover:shadow-purple-500/30 transition-all backdrop-blur-sm ${className}`}
//       {...props}
//     />
//   )
// }

// function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       className={`flex flex-col gap-2 pb-4 border-b border-purple-900/30 ${className}`}
//       {...props}
//     />
//   )
// }

// function CardTitle({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <h3
//       className={`text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent sm:text-2xl ${className}`}
//       {...props}
//     />
//   )
// }

// function CardDescription({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <p className={`text-sm text-gray-300 sm:text-base ${className}`} {...props} />
//   )
// }

// function CardAction({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <div className={`self-end ${className}`} {...props} />
//   )
// }

// function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <div className={`flex-1 space-y-4 ${className}`} {...props} />
//   )
// }

// function CardFooter({ className = "", ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       className={`flex items-center pt-4 border-t border-purple-900/30 ${className}`}
//       {...props}
//     />
//   )
// }

// export {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardAction,
//   CardDescription,
//   CardContent
// }

// components/ui/card.tsx
import * as React from "react"

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ")

export function Card({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-6 rounded-2xl transition-all backdrop-blur-sm",
        "border border-[var(--card-border)] bg-[var(--card-background)] shadow-md",
        "hover:shadow-[0_4px_20px_var(--card-shadow)]",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 pb-4 border-b border-[var(--card-border)]",
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <h3
      className={cn(
        "text-xl font-bold sm:text-2xl",
        "bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <p className={cn("text-sm sm:text-base text-muted-foreground", className)} {...props} />
  )
}

export function CardAction({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("self-end", className)} {...props} />
}

export function CardContent({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex-1 space-y-4", className)} {...props} />
}

export function CardFooter({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center pt-4 border-t border-[var(--card-border)]",
        className
      )}
      {...props}
    />
  )
}
