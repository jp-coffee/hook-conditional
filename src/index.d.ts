type Condition = string | number | boolean;

type HookMap<TCondition extends Condition, TResult> = {
  [K in TCondition & (string | number)]: () => TResult;
} & (TCondition extends boolean ? { [K in "true" | "false"]: () => TResult } : {});

type FallbackHook<TResult> = () => TResult;

declare function useConditionalHook<
  TCondition extends Condition,
  TResult,
  THookMap extends HookMap<TCondition, TResult>
>(
  condition: TCondition,
  hookMap: THookMap,
  fallbackHook?: FallbackHook<TResult>
): TResult;

export default useConditionalHook; 