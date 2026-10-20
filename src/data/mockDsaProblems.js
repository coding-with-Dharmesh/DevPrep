/**
 * Comprehensive DSA Problem Library for DevPrep
 * Categories: Arrays, Strings, Linked Lists, Stacks & Queues, Trees, Graphs, Recursion & Backtracking,
 * Sorting & Searching, Greedy Algorithms, Dynamic Programming.
 */

export const DSA_CATEGORIES = [
  'All',
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stacks & Queues',
  'Trees',
  'Graphs',
  'Recursion & Backtracking',
  'Sorting & Searching',
  'Greedy Algorithms',
  'Dynamic Programming'
];

export const COMPANIES_LIST = [
  'All',
  'Google',
  'Amazon',
  'Microsoft',
  'Adobe',
  'Meta',
  'Apple',
  'Netflix',
  'Uber'
];

export const MOCK_DSA_PROBLEMS = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    acceptance: '52.4%',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Meta'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    hints: [
      'A brute force approach would search all pairs in O(n^2). Can we do it in one pass using extra space?',
      'Use a Hash Map to store elements visited so far along with their index: key = element, value = index.',
      'For each element `x`, check if `target - x` exists in your map.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      approach: 'Hash Map single-pass lookup',
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      explanation: 'We iterate through the array once. At each element, we calculate the required complement `target - nums[i]`. If the complement is already in our map, we have found our pair and return their indices immediately. Otherwise, we insert the current number and index into the map.'
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0, 1]' }
    ]
  },

  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Arrays',
    acceptance: '54.2%',
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Apple'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
  }
  return maxProfit;
}`,
      python: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        return maxProfit;
    }
}`
    },
    hints: [
      'Keep track of the minimum purchase price observed so far as you iterate forward.',
      'At each day, the potential profit would be the current day price minus the minimum price seen so far.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      approach: 'Single pass sliding minimum tracking',
      code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }
  return maxProfit;
}`,
      explanation: 'By maintaining `minPrice` as the lowest stock price recorded up to day `i`, we can compute profit `price - minPrice` and update our global `maxProfit` in O(1) space.'
    },
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expected: '5' },
      { input: 'prices = [7,6,4,3,1]', expected: '0' }
    ]
  },

  {
    id: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Arrays',
    acceptance: '34.8%',
    companies: ['Meta', 'Amazon', 'Microsoft', 'Google', 'Adobe'],
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'Distinct triplets summing to 0 are [-1, -1, 2] and [-1, 0, 1].'
      }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    starterCode: {
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}`,
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]: l += 1
                while l < r and nums[r] == nums[r - 1]: r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        // Two pointer implementation
        return res;
    }
}`
    },
    hints: [
      'Sorting the array first makes finding pairs and avoiding duplicates much simpler.',
      'Fix the first element `nums[i]`, then use a two-pointer approach (`left` and `right`) to find pairs that sum to `-nums[i]`.'
    ],
    solution: {
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(1) excluding output',
      approach: 'Sort array + Two Pointers',
      code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
      explanation: 'Sorting takes O(N log N). For each element, a two pointer sweep takes O(N), yielding total time O(N^2). Skipping identical adjacent values prevents duplicate triplets.'
    },
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', expected: '[]' }
    ]
  },

  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Arrays',
    acceptance: '65.1%',
    companies: ['Amazon', 'Apple', 'Meta', 'Microsoft', 'Google'],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a 32-bit integer.

You must write an algorithm that runs in **O(n)** time and without using the division operation.`,
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]',
        explanation: 'Prefix and suffix multiplications.'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30'
    ],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`,
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        // Prefix and suffix passes
        return res;
    }
}`
    },
    hints: [
      'Think of each output position `i` as `(product of elements to the left) * (product of elements to the right)`.',
      'Make a forward pass to compute prefix products, then a backward pass to multiply suffix products.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) extra space',
      approach: 'Two-pass Prefix & Suffix Products',
      code: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`,
      explanation: 'First pass computes running product from left to right. Second pass computes running product from right to left, directly multiplying into the output array.'
    },
    testCases: [
      { input: 'nums = [1,2,3,4]', expected: '[24, 12, 8, 6]' },
      { input: 'nums = [-1,1,0,-3,3]', expected: '[0, 0, 9, 0, 0]' }
    ]
  },

  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Arrays',
    acceptance: '61.2%',
    companies: ['Google', 'Amazon', 'Adobe', 'Microsoft', 'Uber'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The elevation map traps 6 units of rain water.'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    starterCode: {
      javascript: `function trap(height) {
  let left = 0, right = height.length - 1;
  let maxLeft = 0, maxRight = 0;
  let totalWater = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= maxLeft) maxLeft = height[left];
      else totalWater += maxLeft - height[left];
      left++;
    } else {
      if (height[right] >= maxRight) maxRight = height[right];
      else totalWater += maxRight - height[right];
      right--;
    }
  }
  return totalWater;
}`,
      python: `def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    max_l, max_r = 0, 0
    ans = 0
    while l < r:
        if height[l] < height[r]:
            if height[l] >= max_l: max_l = height[l]
            else: ans += max_l - height[l]
            l += 1
        else:
            if height[r] >= max_r: max_r = height[r]
            else: ans += max_r - height[r]
            r -= 1
    return ans`,
      java: `class Solution {
    public int trap(int[] height) {
        // Two pointer approach
        return 0;
    }
}`
    },
    hints: [
      'Water trapped above any bar `i` is determined by `min(maxLeft, maxRight) - height[i]`.',
      'Instead of precalculating prefixes and suffixes in O(N) space, use two pointers from both ends.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      approach: 'Two Pointers with Left & Right Max',
      code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let maxLeft = 0, maxRight = 0;
  let total = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= maxLeft) maxLeft = height[left];
      else total += maxLeft - height[left];
      left++;
    } else {
      if (height[right] >= maxRight) maxRight = height[right];
      else total += maxRight - height[right];
      right--;
    }
  }
  return total;
}`,
      explanation: 'Since the trapped water is limited by the shorter boundary, we can advance the pointer with the smaller height, ensuring the other side is always at least as tall.'
    },
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
      { input: 'height = [4,2,0,3,2,5]', expected: '9' }
    ]
  },

  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Strings',
    acceptance: '64.5%',
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let ch of s) count[ch] = (count[ch] || 0) + 1;
  for (let ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}`,
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = {}
    for c in s: count[c] = count.get(c, 0) + 1
    for c in t:
        if c not in count or count[c] == 0: return False
        count[c] -= 1
    return True`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
}`
    },
    hints: [
      'Check string lengths first. If not equal, they cannot be anagrams.',
      'Count frequencies of each character in an array of size 26 or a hash map.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) (26 characters)',
      approach: 'Frequency Array count',
      code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++;
    counts[t.charCodeAt(i) - 97]--;
  }
  return counts.every(c => c === 0);
}`,
      explanation: 'We increment count for characters in `s` and decrement for `t`. If all positions return to 0, they are exact anagrams.'
    },
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expected: 'true' },
      { input: 's = "rat", t = "car"', expected: 'false' }
    ]
  },

  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Strings',
    acceptance: '34.9%',
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Meta'],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let left = 0, maxLen = 0;
  const map = new Map();
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    seen = {}
    l = 0
    max_len = 0
    for r, c in enumerate(s):
        if c in seen and seen[c] >= l:
            l = seen[c] + 1
        seen[c] = r
        max_len = max(max_len, r - l + 1)
    return max_len`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Sliding window
        return 0;
    }
}`
    },
    hints: [
      'Use a sliding window with two pointers `[left, right]`.',
      'Record the most recent index of each character to instantly jump `left` past duplicates.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(min(M, N)) where M is alphabet size',
      approach: 'Sliding Window with Hash Map Index Record',
      code: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      explanation: 'As the right pointer expands the window, if we encounter a character already inside `[left, right]`, we shift `left` directly to 1 position past its previous occurrence.'
    },
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "pwwkew"', expected: '3' }
    ]
  },

  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked Lists',
    acceptance: '76.3%',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Apple'],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    starterCode: {
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      python: `def reverseList(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`
    },
    hints: [
      'Iterate through the list while maintaining three pointers: previous node, current node, and next node.',
      'At each node, flip its next pointer to point backwards to prev.'
    ],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      approach: 'Iterative 3-pointer reversal',
      code: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      explanation: 'We iterate through nodes one by one. We preserve `curr.next`, reassign `curr.next` to `prev`, and step `prev` and `curr` forward.'
    },
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected: '[5, 4, 3, 2, 1]' }
    ]
  },

  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked Lists',
    acceptance: '64.2%',
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe'],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' }
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100'],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let current = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return dummy.next;
}`,
      python: `def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    curr = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
    curr.next = list1 or list2
    return dummy.next`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Dummy head pointer
        return null;
    }
}`
    },
    hints: ['Create a dummy node to anchor the head of the new list.', 'Compare values from both lists, attach the smaller node, and advance.'],
    solution: {
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(1)',
      approach: 'Dummy head node iterative merge',
      code: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`,
      explanation: 'Using a dummy node simplifies edge cases like empty lists. We iteratively stitch nodes in sorted order in linear time.'
    },
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expected: '[1, 1, 2, 3, 4, 4]' }
    ]
  },

  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks & Queues',
    acceptance: '40.6%',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Meta'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \`()[]{}\`.'],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in pairs:
            if not stack or stack.pop() != pairs[c]: return False
        else:
            stack.append(c)
    return len(stack) == 0`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        // Stack matching
        return true;
    }
}`
    },
    hints: ['A stack is LIFO (last in, first out). When you see an open bracket, push it.', 'When you see a closing bracket, pop from the stack and verify matching.'],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      approach: 'LIFO Stack with bracket map',
      code: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (pairs[c]) {
      if (stack.pop() !== pairs[c]) return false;
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}`,
      explanation: 'Every closing bracket must match the most recently opened bracket. A stack perfectly models this nesting invariant.'
    },
    testCases: [
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "([)]"', expected: 'false' }
    ]
  },

  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    acceptance: '76.8%',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe'],
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.

(Famous problem associated with Max Howell's Homebrew Google interview story).`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    starterCode: {
      javascript: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
      python: `def invertTree(root):
    if not root: return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.right);
        TreeNode right = invertTree(root.left);
        root.left = left;
        root.right = right;
        return root;
    }
}`
    },
    hints: ['For each node, swap its left and right children recursively.'],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H) where H is tree height',
      approach: 'Recursive Depth First Search',
      code: `function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.right);
  const right = invertTree(root.left);
  root.left = left;
  root.right = right;
  return root;
}`,
      explanation: 'We visit each node once and swap its two child pointers recursively.'
    },
    testCases: [
      { input: 'root = [4,2,7,1,3,6,9]', expected: '[4, 7, 2, 9, 6, 3, 1]' }
    ]
  },

  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Trees',
    acceptance: '32.9%',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google'],
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Root node value is 5, but right child 4 is smaller.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: {
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
      python: `def isValidBST(root, min_val=float('-inf'), max_val=float('inf')) -> bool:
    if not root: return True
    if not (min_val < root.val < max_val): return False
    return isValidBST(root.left, min_val, root.val) and isValidBST(root.right, root.val, max_val)`,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
}`
    },
    hints: ['A node must be strictly greater than ALL nodes in its left subtree, not just its immediate child.', 'Pass down valid ranges (min, max) down the recursion.'],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      approach: 'DFS with upper and lower boundary bounds',
      code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
      explanation: 'Every node in the left subtree must fall into `(min, node.val)`, and every node in the right subtree into `(node.val, max)`.'
    },
    testCases: [
      { input: 'root = [2,1,3]', expected: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', expected: 'false' }
    ]
  },

  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Graphs',
    acceptance: '58.5%',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Meta'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3'
      }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1".'],
    starterCode: {
      javascript: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `def numIslands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        // DFS flood fill
        return 0;
    }
}`
    },
    hints: ['Treat the 2D grid as an undirected graph where each "1" is a node connected to adjacent "1"s.', 'When you find a "1", increment your island count and run DFS or BFS to sink/mark the whole island.'],
    solution: {
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N) call stack in worst case',
      approach: 'DFS Flood Fill / Connected Components',
      code: `function numIslands(grid) {
  let count = 0;
  const R = grid.length, C = grid[0].length;
  function sink(r, c) {
    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] === '0') return;
    grid[r][c] = '0';
    sink(r + 1, c); sink(r - 1, c);
    sink(r, c + 1); sink(r, c - 1);
  }
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === '1') {
        count++;
        sink(r, c);
      }
    }
  }
  return count;
}`,
      explanation: 'Every cell is visited at most a constant number of times. Sinking discovered islands in-place eliminates the need for an external visited hash set.'
    },
    testCases: [
      { input: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]', expected: '1' }
    ]
  },

  {
    id: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    acceptance: '47.1%',
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle exists.' }
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2'],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    count++;
    for (const next of adj[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return count === numCourses;
}`,
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    from collections import deque
    in_degree = [0] * numCourses
    adj = [[] for _ in range(numCourses)]
    for c, p in prerequisites:
        adj[p].append(c)
        in_degree[c] += 1
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    taken = 0
    while q:
        curr = q.popleft()
        taken += 1
        for nxt in adj[curr]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                q.append(nxt)
    return taken == numCourses`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Kahn's algorithm (topological sort)
        return true;
    }
}`
    },
    hints: ['This is the classic cycle detection in a directed graph.', 'Use Kahn’s algorithm (BFS with in-degree tracking) or 3-state DFS.'],
    solution: {
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      approach: "Kahn's Algorithm for Topological Sort",
      code: `function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [c, p] of prerequisites) {
    adj[p].push(c);
    inDegree[c]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length) {
    const u = queue.shift();
    count++;
    for (const v of adj[u]) {
      if (--inDegree[v] === 0) queue.push(v);
    }
  }
  return count === numCourses;
}`,
      explanation: 'We populate the in-degree of all nodes. Nodes with 0 in-degree can be taken first. As nodes are resolved, dependencies decrement. If we process all V nodes, no cycle exists.'
    },
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expected: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expected: 'false' }
    ]
  },

  {
    id: 'subsets',
    title: 'Subsets',
    difficulty: 'Medium',
    category: 'Recursion & Backtracking',
    acceptance: '77.3%',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: `Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the solution in any order.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' }
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
    starterCode: {
      javascript: `function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,
      python: `def subsets(nums: list[int]) -> list[list[int]]:
    res = []
    def backtrack(start, path):
        res.append(list(path))
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res`,
      java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), res);
        return res;
    }
}`
    },
    hints: ['At each step, we can either include or exclude the current element, or generate prefixes by index iteration.'],
    solution: {
      timeComplexity: 'O(2^N * N)',
      spaceComplexity: 'O(N) recursion stack',
      approach: 'Backtracking',
      code: `function subsets(nums) {
  const res = [];
  function backtrack(start, path) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      explanation: 'There are 2^N total subsets. Backtracking builds combinations incrementally, appending a copy of the candidate list to results at each step.'
    },
    testCases: [
      { input: 'nums = [1,2,3]', expected: '8 subsets' }
    ]
  },

  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Sorting & Searching',
    acceptance: '58.2%',
    companies: ['Microsoft', 'Google', 'Amazon', 'Adobe', 'Apple'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique and sorted.'],
    starterCode: {
      javascript: `function search(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        elif nums[m] < target: l = m + 1
        else: r = m - 1
    return -1`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
}`
    },
    hints: ['Calculate mid using `low + Math.floor((high - low) / 2)` to avoid integer overflow.'],
    solution: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      approach: 'Iterative Binary Search',
      code: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}`,
      explanation: 'Halves the search space on each iteration by comparing the target with the median item.'
    },
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' }
    ]
  },

  {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Sorting & Searching',
    acceptance: '40.8%',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Adobe'],
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values).

Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index. Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must achieve **O(log n)** runtime complexity.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i], target <= 10^4', 'All values of nums are unique.'],
    starterCode: {
      javascript: `function searchRotated(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    // Check if left half is sorted
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    } else { // Right half is sorted
      if (nums[mid] < target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return -1;
}`,
      python: `def searchRotated(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]: r = mid - 1
            else: l = mid + 1
        else:
            if nums[mid] < target <= nums[r]: l = mid + 1
            else: r = mid - 1
    return -1`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Rotated binary search
        return -1;
    }
}`
    },
    hints: ['Notice that one half of the array will always be normally sorted.', 'Determine which half is sorted and check if the target falls within that sorted range.'],
    solution: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      approach: 'Modified Binary Search with Sorted Half Detection',
      code: `function searchRotated(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return -1;
}`,
      explanation: 'At least one half is monotonically increasing. We can easily verify if target falls into the sorted segment; if not, it must be in the opposite half.'
    },
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4' }
    ]
  },

  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    category: 'Greedy Algorithms',
    acceptance: '38.9%',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'],
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You will always arrive at index 3 where jump is 0.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    starterCode: {
      javascript: `function canJump(nums) {
  let reachable = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reachable) return false;
    reachable = Math.max(reachable, i + nums[i]);
    if (reachable >= nums.length - 1) return true;
  }
  return true;
}`,
      python: `def canJump(nums: list[int]) -> bool:
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + jump)
    return True`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }
}`
    },
    hints: ['Think greedily: what is the maximum index we can possibly reach as we iterate through?'],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      approach: 'Greedy Farthest Reach Tracker',
      code: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`,
      explanation: 'At each position, if our current index is beyond `maxReach`, we are stuck. Otherwise, we update `maxReach` greedily.'
    },
    testCases: [
      { input: 'nums = [2,3,1,1,4]', expected: 'true' },
      { input: 'nums = [3,2,1,0,4]', expected: 'false' }
    ]
  },

  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptance: '43.9%',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Apple'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - c]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], 1 + dp[i - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    hints: ['Define `dp[i]` as the minimum coins needed to make amount `i`.', 'For each coin `c`, `dp[i] = min(dp[i], 1 + dp[i - c])`.'],
    solution: {
      timeComplexity: 'O(amount * number of coins)',
      spaceComplexity: 'O(amount)',
      approach: 'Bottom-up Dynamic Programming',
      code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      explanation: 'We build optimal solutions for all sub-amounts up to `amount`. Each sub-problem inspects taking one of the available coins.'
    },
    testCases: [
      { input: 'coins = [1,2,5], amount = 11', expected: '3' },
      { input: 'coins = [2], amount = 3', expected: '-1' }
    ]
  },

  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    acceptance: '53.6%',
    companies: ['Amazon', 'Google', 'Adobe', 'Apple'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' }
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let next = a + b;
    a = b;
    b = next;
  }
  return b;
}`,
      python: `def climbStairs(n: int) -> int:
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}`
    },
    hints: ['To reach step n, you came from step n-1 or step n-2. Thus `ways(n) = ways(n-1) + ways(n-2)`. Fibonacci!'],
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      approach: 'Fibonacci Sequence Space Optimization',
      code: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      explanation: 'Since each step only depends on the previous two steps, we can compute the answer using two variables instead of an array.'
    },
    testCases: [
      { input: 'n = 2', expected: '2' },
      { input: 'n = 5', expected: '8' }
    ]
  }
];
