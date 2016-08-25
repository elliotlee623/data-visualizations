
public class isAvgGreaterThan {
	
	public static boolean isAverageGreater(float[] arrayNums, float myValue){
		int sum = 0;
		int average = 0;
		for(int i = 0; i < arrayNums.length; i++){
			sum += arrayNums[i];
		}
		average = sum/arrayNums.length;
		
		if(average > myValue){
			return true;
		}
		
		return false;
	}
	
	public static void main(String[] args){
		float[] myArray = {1,2,3,4,5};
		boolean test1 = isAverageGreater(myArray, 4);
		boolean test2 = isAverageGreater(myArray, 2);
		
		System.out.println(test1);
		System.out.println(test2);
		
	}

}
