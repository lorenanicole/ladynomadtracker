name = "Back of the Yards College Prep"

def hello_world(input)
	if input.split(" ").length() >= 6 
		puts "Hello #{input}!!!!"
	else
		puts "Hello World!"
	end
end

# What do you think the output is?
hello_world(name) 




def is_palindrome?(word)
	if word.length() < 0
		return false
	end
	pairs = word.length() / 2
	(0..pairs).each do |i|
		unless word[i] == word[-i-1]
			return false
		end
	end
	return true
end

puts is_palindrome?("racecar") == true
puts is_palindrome?("dog") == false
puts is_palindrome?("mom") == true






example: "racecar"
Is "r" equal to "r"? 
	Yes
Is "a" equal to "a"?
	Yes
Is "c" equal to "c"?
	Yes
Is "e" equal to "e" ?
	Yes
Are there any more letters to compare?
	No, the word is a palindrome! 

# Step 1: Is the number divisible by 4?
# 	If no, the number is not a leap year.
# Step 2: Is the number divisible by 400?
# 	If no, the number is not a leap year.
# Step 3: Is the number divisible by 100?
# 	If no, the number is not a leap year.