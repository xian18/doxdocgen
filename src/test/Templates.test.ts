//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import TestSetup from "./tools/TestSetup";

// Defines a Mocha test suite to group tests of similar kind together
suite("Template tests", () => {
    const testSetup: TestSetup = new TestSetup("void foo();");

    // Tests
    test("template class", () => {
        const result = testSetup.SetLine("template<typename T, std::size_t M, std::size_t N,"
            + "typename = typename std::enable_if<std::is_arithmetic<T>::value, T>::type>"
            + "class matrix {").GetResult();
        assert.equal("/**\n * @brief \n * \n * @tparam T \n * @tparam M \n * @tparam N \n * "
            + "@tparam std::enable_if<std::is_arithmetic<T>::value, T>::type \n */", result);
    });

    test("template function", () => {
        const result = testSetup.SetLine("template<typename T, typename S>\nT f(T a, S b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @tparam T \n * @tparam S \n * @param a \n * "
            + "@param b \n * @return T \n */", result);
    });

    test("double template", () => {
        const result = testSetup.SetLine("template<typename T>\ntemplate<typename S>\nT f(T a, S b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @tparam T \n * @tparam S \n * @param a \n * "
            + "@param b \n * @return T \n */", result);
    });

    test("template struct", () => {
        const result = testSetup.SetLine("template<typename T, std::size_t m, std::size_t n>\n"
            + "struct myStruct {").GetResult();
        assert.equal("/**\n * @brief \n * \n * @tparam T \n * @tparam m \n * @tparam n \n */", result);
    });
});