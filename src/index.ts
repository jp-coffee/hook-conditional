type Condition = string | number | boolean;

type HookMap<TCondition extends Condition, TResult> = {
  [K in TCondition & (string | number)]: () => TResult;
} & (TCondition extends boolean ? { [K in "true" | "false"]: () => TResult } : {});

type FallbackHook<TResult> = () => TResult;

export const useConditionalHook = <
  TCondition extends Condition,
  TResult,
  THookMap extends HookMap<TCondition, TResult>
>(
  condition: TCondition,
  hookMap: THookMap,
  fallbackHook?: FallbackHook<TResult>
): TResult => {
  const results = Object.entries(hookMap).reduce<Record<string, TResult>>(
    (acc, [key, hook]) => ({ ...acc, [key]: hook() }),
    {}
  );

  const result = results[String(condition)];

  if (result === undefined && !fallbackHook) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[useConditionalHook] No matching hook found for condition "${condition}" and no fallback provided.`
      );
    }
    return results[Object.keys(results)[0]];
  }

  return result ?? fallbackHook!();
};

export default useConditionalHook; 