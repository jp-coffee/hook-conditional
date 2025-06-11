![hook-conditional Banner](https://raw.githubusercontent.com/jp-coffee/hook-conditional/main/media/hook-conditional-banner.png)

**Dynamic Hook Logic in React, Based on Any Runtime Condition** Simplify conditional logic in your components by delegating it to purpose-built hooks mapped to values like roles, flags, environments, or status codes.

[![npm version](https://img.shields.io/npm/v/hook-conditional.svg)](https://www.npmjs.com/package/hook-conditional)
[![npm downloads](https://img.shields.io/npm/dt/hook-conditional.svg)](https://www.npmjs.com/package/hook-conditional)
[![License](https://img.shields.io/github/license/jp-coffee/hook-conditional)](LICENSE)
[![Tests Status](https://img.shields.io/github/actions/workflow/status/jp-coffee/hook-conditional/lint-and-test.yml?branch=main)](https://github.com/jp-coffee/hook-conditional/actions)

## 🚀 Features

- 🔀 **Switch on Any Condition** – Support for strings, numbers, booleans, or any discriminant value.
- 🧠 **Declarative Hook Selection** – Map conditions to custom hooks and let React do the rest.
- ⚡ **Fully Compliant** – All hooks are called unconditionally, following the Rules of Hooks.
- ✨ **Tiny & Typed** – Minimal, type-safe API with full IntelliSense support.
- 🛡 **Optional Fallback** – Gracefully handle unmatched conditions with a fallback hook.

## 📦 Getting Started

### Installation

Install via your preferred package manager:

```sh
# npm
npm install hook-conditional

# yarn
yarn add hook-conditional

# pnpm
pnpm add hook-conditional

# bun
bun add hook-conditional
```

### Basic Usage

```tsx
"use client";

import { useConditionalHook } from "hook-conditional";

const Page = () => {
  const env = process.env.NODE_ENV;

  const value = useConditionalHook(env, {
    development: () => useDevHook(),
    production: () => useProdHook(),
    test: () => useTestHook(),
  });

  return <p>{value}</p>;
};
```

## 🔍 API Reference

### `useConditionalHook(condition, hookMap, fallbackHook?)` _(TypeScript)_

Switches between custom hooks based on a condition. All mapped hooks are **always executed** to comply with React’s Rules of Hooks, but **only the result of the matching hook is returned**.

#### Parameters

- `condition` (`string | number | boolean`)  
  The runtime value that determines which hook result to return.

- `hookMap` (`Record<string | number, () => TResult>`)  
  An object where each key corresponds to a possible value of `condition`, and the value is a hook function to execute.

- `fallbackHook` (`() => TResult`, optional)  
  A fallback hook to use when no match is found in the map.

#### Returns

- `TResult` — The result of the matched hook (or fallback hook if no match is found).

## 💡 Examples

### Role-based hook switching

```tsx
"use client";

import useConditionalHook from "hook-conditional";

const Page = () => {
  const role = useUserRole();

  const permissions: string[] = useConditionalHook(role, {
    guest: () => useGuestPermissions(),
    user: () => useUserPermissions(),
    admin: () => useAdminPermissions(),
  });

  return <div>Permissions: {permissions.join(", ")}</div>;
};
```

### Boolean feature flag

```tsx
"use client";

import useConditionalHook from "hook-conditional";

const Page = () => {
  const isEnabled = useFeatureFlag("new-ui");

  const ui = useConditionalHook(isEnabled, {
    true: () => useNewUI(),
    false: () => useOldUI(),
  });

  return <>{ui}</>;
};
```

### Numeric condition

```tsx
"use client";

import useConditionalHook from "hook-conditional";

const Page = () => {
  const status = useStatus();

  const content = useConditionalHook(
    status,
    {
      200: () => useSuccessContent(),
      404: () => useNotFoundContent(),
      500: () => useErrorContent(),
    },
    () => useDefaultContent()
  );

  return <>{content}</>;
};
```

## 🛠 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

Please ensure your code matches the project style and includes relevant tests if applicable.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Created By

This package is developed and maintained by [JP.Coffee](https://github.com/jp-coffee). Feel free to reach out or open an issue for any questions or suggestions!
