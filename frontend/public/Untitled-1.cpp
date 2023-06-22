
#include <iostream>
#include <vector>
using namespace std;

int find_maximum_k(int w, int t, int n, int d, vector<int>& a) {
    int min_days = INT_MAX;  // Initialize the minimum number of days required to reach the target weight

    for (int k = 0; k <= n; ++k) {
        int max_workouts = k * (k + 1) / 2;  // Calculate the maximum number of workouts that can be performed in k days

        if (max_workouts <= d) {
            int total_weight_loss = 0;
            for (int i = 0; i < max_workouts; ++i) {
                total_weight_loss += a[i];  // Calculate the total weight loss achievable in d days using max_workouts
            }
            int min_weight = w - total_weight_loss;

            if (min_weight <= t) {
                min_days = min(min_days, d);  // Update min_days if it's smaller than the current min_days
            }
        }
    }

    if (min_days == INT_MAX) {
        if (n == k) {
            return -2;  // k can be infinite
        } else {
            return -1;  // It's not possible to achieve the target weight
        }
    } else {
        return min_days;
    }
}

int main() {
    int w = 80;
    int t = 75;
    int n = 2;
    int d = 4;
    vector<int> a = {1, 2};

    int result = find_maximum_k(w, t, n, d, a);
    cout << result << endl;  // Output: 2

    return 0;
}
